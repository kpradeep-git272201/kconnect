import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-my-attendance',
  templateUrl: './my-attendance.page.html',
  styleUrls: ['./my-attendance.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class MyAttendancePage implements OnInit {

  myAttendance: any;
 
   constructor(private commonService: CommonService,
     private alertService: AlertService,
     private loadingService: LoadingService,
     private iconService: IconService
   ) {
    this.iconService.registerIcons();
   }
 
   ngOnInit() {
     this.getMyAttendance();
   }
 
   async getMyAttendance() {
   await this.loadingService.showLoading();
     this.commonService.getMyAttendance().subscribe(async (resp) => {
       if(resp){
         this.myAttendance=[resp.body];
         this.myAttendance=this.myAttendance.map((person) => ({
           ...person,
           bgColor: this.getRandomLightColor(),
         }));
         await this.loadingService.hideLoading();
       }
     },async (error)=>{
      await this.loadingService.hideLoading();
       this.alertService.showAlert("Alert!", "Someting went wrong!", "alert");
     });
   }


   getRandomLightColor(): string {
     const hue = Math.floor(Math.random() * 360); // full color wheel
     const saturation = 70 + Math.random() * 10; // 70-80%
     const lightness = 80 + Math.random() * 10; // 80-90%
     return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
   }

   getDuration(inTime: string, outTime: string): string {
    const start = new Date('1970-01-01T' + inTime.split('.')[0]);
    const end = new Date('1970-01-01T' + outTime.split('.')[0]);
  
    const diffMs = end.getTime() - start.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  }
}
