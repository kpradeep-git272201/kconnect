import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconService } from 'src/app/services/icon.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { FooterPage } from '../../../footer/footer.page';

@Component({
  selector: 'app-principal-dashboard',
  templateUrl: './principal-dashboard.page.html',
  styleUrls: ['./principal-dashboard.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class PrincipalDashboardPage implements OnInit {
  totalEmployee: any;
  user: any;
  loggedUser: any;
  isPrincipal: boolean;

  constructor(
    private iconService: IconService,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {
    this.user = this.commonService.getLoggedUser();
    this.getTotalEmployee();
    const loggedUser: any = localStorage.getItem('loggedUser');
    const token = localStorage.getItem('token');
    if (token) {
      const user: any = loggedUser ? JSON.parse(loggedUser) : loggedUser;
      this.isPrincipal = user?.roleId == 3 ? true : false;
    }
  }
  onClick(action:string){
    if(action=='Dashboard'){
      this.router.navigate(['/principal/dashboard']);
    }else if(action=='UploadEvent'){
      this.router.navigate(["/principal/upload-event"]);
    }else if(action=='ViewEvent'){
      this.router.navigate(["/principal/view-event"]);

    }
  }
  logout() {
    this.commonService.getLogout();
  }

  markAttendance() {
    this.router.navigate(['/principal/mark-attendance-emp']);
  }

  goToTotalEmployee() {
    this.router.navigate(['/principal/total-employee']);
  }

  goToPresentEmployee() {
    this.router.navigate(['/principal/present-employee']);
  }
  goToMyAttendance() {
    this.router.navigate(['/principal/my-attendance']);
  }

  async getTotalEmployee() {
    await this.loadingService.showLoading();
    const branchId = 0;
    this.commonService.getTotalEmp(branchId).subscribe(
      async (resp) => {
        if (resp?.body) {
          this.totalEmployee = resp.body;
        }
        await this.loadingService.hideLoading();
      },
      async (error) => {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert!', 'Something went wrong!', 'alert');
      },
    );
  }
}
