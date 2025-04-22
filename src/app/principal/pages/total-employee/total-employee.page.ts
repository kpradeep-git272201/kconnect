import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-total-employee',
  templateUrl: './total-employee.page.html',
  styleUrls: ['./total-employee.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class TotalEmployeePage implements OnInit {
  @ViewChild('hiddenDateInput') dateInput!: ElementRef;
  currentDate: string = new Date().toISOString().split('T')[0];
  attendanceData: any=[];
  filteredEmployee: any = []; 
  submitionDate: any=this.currentDate;;
  
  constructor(private commonService: CommonService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private iconService: IconService
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {
    const currentDate=moment().format("YYYY-MM-DD");
    this.getEmployeeList(currentDate);
  }
  

  openDatePicker() {
    this.dateInput.nativeElement.click();
  }
  
  
  formatDate(event: any) {
    this.submitionDate = event.target.value;
  }

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    console.log('Selected date:', selectedDate);
    this.getEmployeeList(selectedDate);
  }
  async getEmployeeList(currentDate:any) {
    await this.loadingService.showLoading();
    const data = {
      branchId:0,
      fromDate: currentDate
    };
    this.commonService.getEmployeeList(data).subscribe(async (resp) => {
      if(resp){
        this.attendanceData=resp.body;
        this.filteredEmployee=this.attendanceData.map((person) => ({
          ...person,
          bgColor: this.getRandomLightColor(),
        }));
      }
      await this.loadingService.hideLoading();
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

  filterEmployees(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    this.filteredEmployee = this.attendanceData.filter(person =>
      person.name.toLowerCase().includes(query)
    ).map((person) => ({
      ...person,
      bgColor: this.getRandomLightColor(),
    }));;
  }
}
