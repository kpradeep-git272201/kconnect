import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { logoIonic, homeOutline, documentOutline, bookOutline, cardOutline, documentTextOutline, newspaperOutline, starOutline, megaphoneOutline, schoolOutline, cashOutline, checkboxOutline, chatboxEllipsesOutline, mailOutline, notificationsOutline, appsOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { IconService } from 'src/app/services/icon.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class DashboardPage implements OnInit {
  user: any;

  constructor(private router: Router, private iconService: IconService,
    private commonService: CommonService
  ) { 
    addIcons({notificationsOutline,appsOutline,documentOutline,bookOutline,homeOutline,cardOutline,documentTextOutline,newspaperOutline,starOutline,megaphoneOutline,schoolOutline,cashOutline,checkboxOutline,chatboxEllipsesOutline,mailOutline,logoIonic});
    this.iconService.registerIcons();
  }

  ngOnInit() {
   this.user = this.commonService.getLoggedUser();
  }


  goToAttendance(){
    this.router.navigate(["/apps/attendance"]);
  }
  goToHomework(){
    this.router.navigate(["/apps/homework"]);
  }

  markAttendance(){
    this.router.navigate(["/apps/mark-attendance"]);
  }

  attendanceLogs(){
    this.router.navigate(["/apps/attendance-logs"]);
  }

  studentAttendance(){
    this.router.navigate(["/apps/student-attendance"]);
  }

  goToUploadHomework(){
    this.router.navigate(["/apps/upload-homework"]);
  }

  goToUploadClasswork(){
    this.router.navigate(["/apps/upload-classwork"]);
  }

  goToSeeHomework(){
    this.router.navigate(["/apps/see-homework"]);
  }
  goToSeeClasswork(){
    this.router.navigate(["/apps/see-classwork"]);
  }
  goToUploadAssignment(){
    this.router.navigate(["/apps/upload-assignment"]);
  }
  goToViewAssignment(){
    this.router.navigate(["/apps/view-assignment"]);
  }
  goToDashboard(){
    this.router.navigate(["/apps/dashboard"]);
  }
}
