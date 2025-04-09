import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Camera } from '@capacitor/camera';
import { MyCustomPlugin } from 'my-custom-plugin/src';
import { ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppConfig } from 'src/app/config/app.config';
import { AttendanceSuccessModalComponent } from 'src/app/components/attendance-success-modal/attendance-success-modal.component';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import moment from 'moment';
import { LoadingService } from 'src/app/services/loading.service';
import { Geolocation } from '@capacitor/geolocation';




@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.page.html',
  styleUrls: ['./mark-attendance.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [SharedModule]
})
export class MarkAttendancePage implements OnInit {
 
  capturedImage: string | null = null;
  successMessage:string="";
  dateTime: string = moment().format('DD-MMM-YYYY hh:mm:ss A');
  markAttendanceFailed: boolean=false;
  showCamera=true;
  constructor(private cd: ChangeDetectorRef,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private loadingService: LoadingService
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
        if (result.image.startsWith('data:image')) {
          this.capturedImage = result.image;
        } else {
          this.capturedImage = `data:image/jpeg;base64,${result.image}`;
        }
        this.getCurrentLocation(this.capturedImage);

        this.cd.detectChanges(); 
      } else {
        alert('Camera permission is required to take a photo.');
      }
    } catch (err) {
      this.showCamera=true;
      this.markAttendanceFailed=false;
      this.successMessage="";
      this.capturedImage = `Detection failed ${err}`;
    }
  }

  async getCurrentLocation(capturedImage:string) {
    try {
      // const position = await Geolocation.getCurrentPosition();
  
      // const lat = position.coords.latitude;
      // const lng = position.coords.longitude;
  
      // console.log('Latitude:', lat);
      // console.log('Longitude:', lng);
      this.markAttendance(capturedImage, 'lat' , 'lng');
    } catch (err) {
      this.showCamera=true;
      this.markAttendanceFailed=false;
      this.successMessage="";
      console.error('Location error:', err);
      alert('Please enable location services.');
    }
  }

  async markAttendance(imageBase64:string, lat:any, lng:any){
    await this.loadingService.showLoading();
    const data={
      "longitude": lng,
      "latitude": lat,
      "photo": imageBase64
    }
    // this.commonService.markAttendance(data).subscribe(
    //   async (resp) => {
    //    console.log(resp);
    //    await this.loadingService.hideLoading();
    //    if(resp){
        // this.markAttendanceFailed=false;
        // this.successMessage="Your attendance has been successfully recorded.";
        this.showCamera=false;
        this.markAttendanceFailed=true;
        this.successMessage="";


    //    }
    //   },
    //   async (error) => {
        await this.loadingService.hideLoading();
    //     this.successMessage="";
    //     this.markAttendanceFailed=true;
    //   },
    // );
  }

  


  tryAgain(){
    this.markAttendanceFailed=false;
    this.successMessage="";
    this.startDetection();
  }


  // async getModel(){
  //     const alert = await this.alertController.create({
  //       header: 'Alert',
  //       subHeader: 'Important message',
  //       message: `<div class="alert-thumbnail">
  //       <img src="assets/imgs/sample.jpg" alt="Thumbnail" />
  //       <p>This is an alert message with a thumbnail.</p>
  //     </div>`,
  //       cssClass: 'custom-alert',
  //       buttons: ['OK'],
  //     });
  //     await alert.present();
  //   }
  // }
  // async openSuccessModal(capturedImage: string) {
  //   const modal = await this.modalController.create({
  //     component: AttendanceSuccessModalComponent,
  //     componentProps: {
  //       photo: capturedImage,
  //       time: new Date().toLocaleString(),
  //       message: 'Your attendance has been marked successfully!'
  //     },
  //    cssClass: 'alert-style-modal'
  //   });
  
  //   await modal.present();
  // }

  // async openCustomPopup(){
  //   const modal = await this.modalController.create({
  //     component: AttendanceSuccessModalComponent,
  //     componentProps: {
  //       title: 'My Custom Popup',
  //       message: `<strong>Hello!</strong><br>This is a custom HTML popup.`
  //     },
  //     showBackdrop: true,
  //     backdropDismiss: false,
  //     cssClass: 'my-custom-modal'
  //   });

  //   await modal.present();
}
