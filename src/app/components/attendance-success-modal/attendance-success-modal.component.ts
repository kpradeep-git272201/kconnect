import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-attendance-success-modal',
  templateUrl: './attendance-success-modal.component.html',
  styleUrls: ['./attendance-success-modal.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class AttendanceSuccessModalComponent  implements OnInit {
  // safePhotoUrl: SafeUrl | undefined;

  // photo: string =
  //   'https://via.placeholder.com/150'; // or a base64 image string
  // time: string = 'April 9, 2025, 10:45 AM';
  // message: string = 'This is a test message for the modal.';

  // constructor(private modalCtrl: ModalController,
  //   private sanitizer: DomSanitizer,
  // ) {}
  
  @Input() title: string = '';
  @Input() message: string = '';

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
  //    console.log('Photo:', this.photo);
  // console.log('Time:', this.time);
  // console.log('Message:', this.message);

  // if (this.photo) {
  //   this.safePhotoUrl = this.sanitizer.bypassSecurityTrustUrl(this.photo);
  // }
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }

  

}
