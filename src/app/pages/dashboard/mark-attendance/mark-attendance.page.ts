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
  successMessage:string;
  constructor(private cd: ChangeDetectorRef) {}


  ngAfterViewInit() {
    this.startDetection();
  }

  ngOnDestroy() {
    this.stopCamera();
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
        // alert('Got result: ' + JSON.stringify(result.image));
        if (result.image.startsWith('data:image')) {
          this.capturedImage = result.image;
        } else {
          this.capturedImage = `data:image/jpeg;base64,${result.image}`;
        }
        // alert('Captured image set in variable');
        this.successMessage = "✅ Attendance marked successfully! Have a great day 😊";
        // this.stopCamera();
        this.cd.detectChanges(); 
      } else {
        alert('Camera permission is required to take a photo.');
      }
    } catch (err) {
      this.capturedImage = `Detection failed ${err}`;
      console.error('Detection failed', err);
    }
  }

  stopCamera(){
    MyCustomPlugin.stopCamera()
      .then(() => {
        // alert('Camera stopped successfully');
        this.successMessage = "✅ Attendance marked successfully! Have a great day 😊";
        this.capturedImage=`data:image/jpeg;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVFRUVFRUVFRUVFRUVFRcVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGyslICYtLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAYFB//EADYQAAIBAwMCBAQDBwMEAwAAAAECEQADITEEEkFRYXGBBhMykaGx8ELB0fAjUsHRM3KywhYkQ3Ki4f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACQRAAICAgIDAQADAQAAAAAAAAABAhEDITESQVFhEyIyMfAj/9oADAMBAAIRAxEAPwD7cREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH//Z`;
      })
      .catch(err => console.error('Failed to stop camera', err));
  }
}
