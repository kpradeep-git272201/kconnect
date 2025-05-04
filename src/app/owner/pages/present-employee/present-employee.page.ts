import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-present-employee',
  templateUrl: './present-employee.page.html',
  styleUrls: ['./present-employee.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class PresentEmployeePage implements OnInit {
  presentEmployee: any = [];
  filteredEmployee: any = [];
  branchId: any;
  constructor(
    private commonService: CommonService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private iconService: IconService,
    private route: ActivatedRoute,
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['branchId']) {
        this.branchId = params['branchId'];
      }
    });
    this.getPresentEmployee();
  }

  async getPresentEmployee() {
    await this.loadingService.showLoading();
    this.commonService.getPresentEmployee(this.branchId).subscribe(
      async (resp) => {
        if (resp?.body.length>0) {
          this.presentEmployee = resp.body;
          this.presentEmployee = JSON.parse(
            JSON.stringify(this.presentEmployee),
          );
          this.filteredEmployee = this.presentEmployee;
          await this.loadingService.hideLoading();
        }else{
          await this.loadingService.hideLoading();
        }
      },
      async (error) => {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert!', 'Someting went wrong!', 'alert');
      },
    );
  }

  filterEmployees(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    this.filteredEmployee = this.presentEmployee.filter((person) =>
      person.name.toLowerCase().includes(query),
    );
  }
}
