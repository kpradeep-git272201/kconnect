import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonChip } from "@ionic/angular/standalone";

@Component({
  selector: 'app-attendance-logs',
  templateUrl: './attendance-logs.page.html',
  styleUrls: ['./attendance-logs.page.scss'],
  standalone: true,
  imports: [IonChip, SharedModule]
})
export class AttendanceLogsPage implements OnInit {
  attendanceLogs:any=[];
  constructor(private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getAttendanceLogs();
  }


  async getAttendanceLogs(){
    await this.loadingService.showLoading();
    this.commonService.getAttendanceLogs().subscribe(
      async (resp) => {
       await this.loadingService.hideLoading();
       if(resp.body){
        this.attendanceLogs=[resp.body];
       }
      },
      async (error) => {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert','Something went wrong!', 'alert');
      },
    );
  }

  calculateWorkingHours(inTime: string, outTime: string): string {
    try {
      const inDate = new Date(`1970-01-01T${inTime}`);
      const outDate = new Date(`1970-01-01T${outTime}`);
      const diffMs = outDate.getTime() - inDate.getTime();
  
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
      return `${hours}h ${minutes}m`;
    } catch {
      return 'N/A';
    }
  }
  
}
