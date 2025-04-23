import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-see-homework',
  templateUrl: './see-homework.page.html',
  styleUrls: ['./see-homework.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class SeeHomeworkPage implements OnInit {

  classList: any=[];
  subjectList: any=[];
  months: any=[
    { value: '1', name: 'January' },
    { value: '2', name: 'February' },
    { value: '3', name: 'March' },
    { value: '4', name: 'April' },
    { value: '5', name: 'May' },
    { value: '6', name: 'June' },
    { value: '7', name: 'July' },
    { value: '8', name: 'August' },
    { value: '9', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  selectedClass: any | null = null;
  selectedSubject: any | null = null;
  selectedMonth: any | null = null;
  viewWorkList: any=[];

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private iconService: IconService,
  ) { 
    this.iconService.registerIcons()
  }

  ngOnInit() {
    this.getClassList();
  }

  async getClassList() {
    await this.loadingService.showLoading();
    this.commonService.getFaculityWiseClass().subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp) {
          this.classList = resp.body;
        }
      },
      async () => {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert!', 'Something went wrong!', 'alert');
      },
    );
  }
  onClassChange(event: any) {
    this.selectedClass=event.detail.value;
    this.getSubjectListClassWise(event.detail.value);
  }
  onSubjectChange(event: any) {
    this.selectedSubject=event.detail.value;
    this.viewWork(this.selectedClass, this.selectedSubject, this.selectedMonth);
  }
  onMonthChange(event: any) {
    this.selectedMonth=event.detail.value;
    this.viewWork(this.selectedClass, this.selectedSubject, this.selectedMonth);
  }
  async getSubjectListClassWise(classId: any) {
    await this.loadingService.showLoading();
    this.commonService.getSubjectByClassId(classId).subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp?.body.length>0) {
          this.subjectList = resp.body;
          this.viewWork(this.selectedClass, this.selectedSubject, this.selectedMonth);
        }else{
          this.subjectList=[];
          await this.loadingService.hideLoading();
          this.alertService.showAlert('Alert!', 'Subject not found for selected class', 'alert');
        }
      },
      async () => {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert!', 'Something went wrong!', 'alert');
      },
    );
  }

  async viewWork(selectedClass,selectedSubject,selectedMonth){

    if(selectedClass!=null && selectedSubject!=null && selectedMonth!=null){
      await this.loadingService.showLoading();  
      this.commonService.getSeeHomework(this.selectedMonth, this.selectedSubject, this.selectedClass, 0).subscribe(async (resp)=>{
        if(resp?.body.length>0){
          await this.loadingService.hideLoading();
          this.viewWorkList=resp.body;
        }else{
          await this.loadingService.hideLoading();
          this.viewWorkList=[];
        }
      })
    }else{
      // await this.loadingService.hideLoading();
      // this.alertService.showAlert('Alert!', 'Class, Subject and Month should not be null', 'alert');
    }
  }

  editHomework(classwork:any){
    this.alertService.showAlert('Soon!', 'This is not availabe', 'alert');
  }

}
