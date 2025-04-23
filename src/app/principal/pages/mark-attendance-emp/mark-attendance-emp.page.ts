import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Camera } from '@capacitor/camera';
import { MyCustomPlugin } from 'my-custom-plugin/src';
import { ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import moment from 'moment';
import { LoadingService } from 'src/app/services/loading.service';
import { Geolocation } from '@capacitor/geolocation';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-mark-attendance-emp',
  templateUrl: './mark-attendance-emp.page.html',
  styleUrls: ['./mark-attendance-emp.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [SharedModule],
})
export class MarkAttendanceEmpPage implements OnInit {
  capturedImage: string | null = null;
  successMessage: string = '';
  dateTime: string = moment().format('DD-MMM-YYYY hh:mm:ss A');
  markAttendanceFailed: boolean = false;
  showCamera = true;
  inLocation: any;
  calculatedDistance: number;

  constructor(
    private cd: ChangeDetectorRef,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
  ) {}

  async ngOnDestroy() {
    this.stopCamera();
    await this.loadingService.hideLoading();
  }

  async ngOnInit() {

  }

  async ngAfterViewInit() {
    await this.loadingService.showLoading();
    await this.checkDistanceAndStartDetection();
    await this.loadingService.hideLoading();
  }
  async checkDistanceAndStartDetection() {
    try {
      const perm = await Geolocation.requestPermissions();
      if (perm.location === 'denied') {
        await this.loadingService.hideLoading();
        this.alertService.showAlert(
          'Alert',
          'Location permission denied. Please allow it from settings.',
          'alert',
        );
        return;
      }
      if (!navigator.geolocation) {
        await this.loadingService.hideLoading();
        this.alertService.showAlert(
          'Alert',
          'Location services are not available on your device.',
          'alert',
        );
        return;
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      const currentLat = position.coords.latitude;
      const currentLng = position.coords.longitude;

      this.commonService.getBranchLatLong().subscribe(
        async (response: any) => {
          if (response?.body) {
            const apiLat = parseFloat(response.body.latitude);
            const apiLng = parseFloat(response.body.longitude);

            const distance = this.getDistanceInMeters(
              currentLat,
              currentLng,
              apiLat,
              apiLng,
            );
            const fixedDistance=parseFloat(distance.toFixed(2));
            this.calculatedDistance=fixedDistance;
            if (fixedDistance <= 200) {
              this.inLocation = 1;
              this.startDetection();
            } else {
              this.inLocation = 0;
              await this.loadingService.hideLoading();
            }
          }else{
            this.inLocation = undefined;
            await this.loadingService.hideLoading();
            this.alertService.showAlert(
              'Alert!',
              'Location not set. Principal login required.',
              'alert',
            );
          }
        },
        async (error) => {
          await this.loadingService.hideLoading();
          this.alertService.showAlert(
            'Error',
            'Failed to fetch location from server.',
            'alert',
          );
        },
      );
    } catch (err: any) {
      await this.loadingService.hideLoading();
      this.alertService.showAlert(
        'Error',
        'Failed to get current location.',
        'alert',
      );
    }
  }

  getDistanceInMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  stopCamera() {
    MyCustomPlugin.stopCamera()
      .then(() => {})
      .catch((err) => console.error('Failed to stop camera', err));
  }

  async startDetection() {
    try {
      const status = await Camera.requestPermissions();
      if (status.camera === 'granted') {
        const result = await MyCustomPlugin.startFaceDetection();
        await this.loadingService.showLoading();
        if (result.image.startsWith('data:image')) {
          this.capturedImage = result.image;
        } else {
          this.capturedImage = `data:image/jpeg;base64,${result.image}`;
        }
        const capturedImageBase64 = this.capturedImage.split(',')[1];
        await this.getCurrentLocation(capturedImageBase64);

        this.cd.detectChanges();
      } else {
        this.alertService.showAlert(
          'Alert',
          'Camera permission is required to take a photo.',
          'alert',
        );
      }
    } catch (err) {
      await this.loadingService.hideLoading();
      this.tryAgain();
      this.markAttendanceFailed = true;
      this.successMessage = '';
      this.capturedImage = `Detection failed ${err}`;
    }
  }

  async getCurrentLocation(capturedImage: string) {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      this.markAttendance(capturedImage, lat, lng);
    } catch (err: any) {
      await this.loadingService.hideLoading();
      this.showCamera = false;
      this.markAttendanceFailed = false;
      this.successMessage = '';
      this.alertService.showAlert(
        'Alert',
        'Failed to get location. Please enable location and try again.',
        'alert',
      );
    }
  }

  async markAttendance(imageBase64: string, lat: any, lng: any) {
    const data = {
      longitude: lng,
      latitude: lat,
      photo: imageBase64,
    };
    this.commonService.markAttendance(data).subscribe(
      async (resp) => {
        console.log(resp);

        await this.loadingService.hideLoading();
        if (resp) {
          this.markAttendanceFailed = false;
          this.successMessage =
            'Your attendance has been successfully recorded.';
          this.showCamera = false;
        } else {
          this.markAttendanceFailed = true;
          this.showCamera = false;
          this.successMessage = '';
        }
      },
      async () => {
        await this.loadingService.hideLoading();
        this.successMessage = '';
        this.markAttendanceFailed = true;
        this.showCamera = false;
      },
    );
  }

  async tryAgain() {
    await this.loadingService.showLoading();
    this.markAttendanceFailed = false;
    this.successMessage = '';
    this.inLocation = undefined;
    await this.checkDistanceAndStartDetection();
    await this.loadingService.hideLoading();
  }
}
