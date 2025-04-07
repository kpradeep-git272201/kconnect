import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Camera } from '@capacitor/camera';
import { MyCustomPlugin } from 'my-custom-plugin/src';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.page.html',
  styleUrls: ['./mark-attendance.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class MarkAttendancePage implements OnInit {
 
  capturedImage: string | null = null;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.startDetection();
  }
  ngOnDestroy() {
   
  }

  async ngOnInit() {}

  // async proceed(){
  //   await MyCustomPlugin.startFaceDetection({ image: "This is my first plugin" }).then((res:any)=>{
  //     alert("Return value is "+JSON.stringify(res.image));
  //   }).catch((err:any)=>{alert(JSON.stringify(err))});
  // }

  
  async startDetection() {
    try {
      const status = await Camera.requestPermissions();
      if (status.camera === 'granted') {
        const result = await MyCustomPlugin.startFaceDetection();
        console.log('Raw result from plugin:', result);
        alert('Got result: ' + JSON.stringify(result.image));

        if (result.image.startsWith('data:image')) {
          this.capturedImage = result.image;
        } else {
          this.capturedImage = `data:image/jpeg;base64,${result.image}`;
        }

        console.log('capturedImage set:', this.capturedImage);
        alert('Captured image set in variable');

        this.cd.detectChanges(); // Force UI to update
      } else {
        alert('Camera permission is required to take a photo.');
      }
    } catch (err) {
      this.capturedImage = `Detection failed ${err}`;
      console.error('Detection failed', err);
    }
  }
}
