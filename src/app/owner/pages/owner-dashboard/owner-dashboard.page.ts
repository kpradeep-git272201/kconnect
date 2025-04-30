import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';
@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.page.html',
  styleUrls: ['./owner-dashboard.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class OwnerDashboardPage implements OnInit {
  user: any;
  selectedBranch: any;
  branchList: any=[];
  totalEmployee: any;
  constructor(private commonService: CommonService,
    private iconService: IconService,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {
    this.iconService.registerIcons();
   }

  ngOnInit() {
    this.user = this.commonService.getLoggedUser();
    this.getBranchListByOwner();
  }

  onBranchChange(event: any) {
    console.log('Selected branch ID:', this.selectedBranch);
  }
  goToTotalEmployee(){
    if(!this.selectedBranch){
      this.alertService.showAlert("Alert!", "Branch not found!", "alert");
      return;
    }
    this.router.navigate(["/owner/total-employee"],{
      queryParams: {
        branchId: this.selectedBranch
      }
    });
  }
  goToPresentEmployee(){
    if(!this.selectedBranch){
      this.alertService.showAlert("Alert!", "Branch not found!", "alert");
      return;
    }
    this.router.navigate(["/owner/present-employee"],{
      queryParams: {
        branchId: this.selectedBranch
      }
    });
  }

  async getBranchListByOwner(){
    await this.loadingService.showLoading();
    this.commonService.getBranchListByOwner().subscribe(async (resp)=>{
      if(resp?.body.length>0){
        this.branchList=resp.body;
        this.selectedBranch = (resp.body.length==1)? resp.body[0].code : '';
        this.getTotalEmployee();
      }else{
        await this.loadingService.hideLoading();
        this.alertService.showAlert("Alert!", "Branch not found!", "alert");
      }
    },async (error)=>{
      await this.loadingService.hideLoading();
      this.alertService.showAlert("Alert!", "Someting went wrong!", "alert");
    });
  }

  async getTotalEmployee(){
    this.commonService.getTotalEmp(this.selectedBranch).subscribe(async (resp)=>{
      if(resp?.body){
        this.totalEmployee=resp.body;
      }
      await this.loadingService.hideLoading();
    },async (error)=>{
      await this.loadingService.hideLoading();
      this.alertService.showAlert("Alert!", "Something went wrong!", "alert");
    })
  }

  
  logout(){
    this.commonService.getLogout();
  }
}
