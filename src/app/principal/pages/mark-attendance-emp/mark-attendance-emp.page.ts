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
  imports: [SharedModule]
})
export class MarkAttendanceEmpPage implements OnInit {

  capturedImage: string | null = null;
  successMessage:string="";
  dateTime: string = moment().format('DD-MMM-YYYY hh:mm:ss A');
  markAttendanceFailed: boolean=false;
  showCamera=true;
  constructor(private cd: ChangeDetectorRef,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
  ) {}


  async ngAfterViewInit() {
    this.startDetection();
    await this.loadingService.hideLoading();
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  async ngOnInit() {}


  stopCamera(){
    MyCustomPlugin.stopCamera()
      .then(() => {
     
      })
      .catch(err => console.error('Failed to stop camera', err));
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
        this.alertService.showAlert('Alert','Camera permission is required to take a photo.', 'alert');

      }
    } catch (err) {
      await this.loadingService.hideLoading();
      this.tryAgain()
      this.markAttendanceFailed=true;
      this.successMessage="";
      this.capturedImage = `Detection failed ${err}`;
    }
  }


  async getCurrentLocation(capturedImage: string) {
    try {

      const perm = await Geolocation.requestPermissions();
      if (perm.location === 'denied') {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert','Location permission denied. Please allow it from settings.', 'alert');
        return;
      }
      if (!navigator.geolocation) {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert','Location services are not available on your device.', 'alert');
        return;
      }
  
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000 
      });
  
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
  
      console.log('Latitude:', lat);
      console.log('Longitude:', lng);

      this.markAttendance(capturedImage, lat, lng);
  
    } catch (err: any) {
      await this.loadingService.hideLoading();
      this.showCamera = false;
      this.markAttendanceFailed = false;
      this.successMessage = "";
      console.error('Location error:', err);
      this.alertService.showAlert('Alert','Failed to get location. Please enable location and try again.', 'alert');
    }
  }
  

  async markAttendance(imageBase64:string, lat:any, lng:any){
   
    const data={
      "longitude": lng,
      "latitude": lat,
      "photo": imageBase64
    }
    this.commonService.markAttendance(data).subscribe(
      async (resp) => {
       console.log(resp);
       
       await this.loadingService.hideLoading();
       if(resp){
        this.markAttendanceFailed=false;
        this.successMessage="Your attendance has been successfully recorded.";
        this.showCamera=false;
       }else{
        this.markAttendanceFailed=true;
        this.showCamera=false;
        this.successMessage="";
       }
      },
      async () => {
        await this.loadingService.hideLoading();
        this.successMessage="";
        this.markAttendanceFailed=true;
        this.showCamera=false;
      },
    );
  }

  


  tryAgain(){
    this.markAttendanceFailed=false;
    this.successMessage="";
    this.startDetection();
  }
}
