import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-homework',
  templateUrl: './upload-homework.page.html',
  styleUrls: ['./upload-homework.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UploadHomeworkPage implements OnInit {
  @ViewChild('hiddenDateInput') dateInput!: ElementRef;
  homeworkForm: FormGroup;
  classList: any = [];
  subjectList:any = [];
  submitionDate: string = moment().format('YYYY-MM-DD');
  selectedDate: string = '';
  recentHomeWork: any;
  buttonText="Upload Homework";
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private iconService: IconService,
    private router: Router
  ) {
    this.iconService.registerIcons();
    this.homeworkForm = this.fb.group({
      homeWorkId: [''],
      classId: [null, Validators.required],
      subjectId: [null, Validators.required],
      workSubmissionDate: [this.submitionDate],
      workTitle: ['', Validators.required],
      workContent: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getClassList();
  }


  openDatePicker() {
    this.dateInput.nativeElement.click();
  }
  
  
  formatDate(event: any) {
    this.submitionDate = event.target.value;
    this.homeworkForm.controls['workSubmissionDate'].setValue(event.target.value);
  }
  onClassChange(event: any) {
    this.homeworkForm.patchValue({ classId: event.detail.value });
    this.getSubjectListClassWise(event.detail.value);
  }

  onSubjectChange(event: any){
    const subjectId=event.detail.value;
    const classId=this.homeworkForm.controls["classId"]?.value;
    if(subjectId && classId != null){
      this.getRecentHomeWork(subjectId, classId);
    }
  }
  async getSubjectListClassWise(classId: any) {
    await this.loadingService.showLoading();
    this.commonService.getSubjectByClassId(classId).subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp?.body.length>0) {
          this.subjectList = resp.body;
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

  async submitHomework() {
    if (this.homeworkForm.invalid) {
      this.homeworkForm.markAllAsTouched();
      return;
    }

    if(this.buttonText=='Update Homework'){
      this.updateHomework();
      return;
    }
    const payload = this.homeworkForm.value;

    await this.loadingService.showLoading();
    this.commonService.uploadHomeWork(payload).subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp.status === 200) {
          this.alertService.showAlert(
            'Uploaded!',
            'Homework uploaded successfully!',
            'success',
          );
          this.homeworkForm.reset();
        } else {
          this.alertService.showAlert(
            'Alert!',
            'Homework/Assignments already added for this date',
            'alert',
          );
        }
      },
      async () => {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert', 'Something went wrong!', 'alert');
      },
    );
  }

  async updateHomework(){
    const payload = this.homeworkForm.value;
    await this.loadingService.showLoading();
    const homeworkId=payload.homeWorkId;
    delete payload['homeWorkId'];
    this.commonService.updateHomeWork(payload, homeworkId).subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp.status === 200) {
          this.alertService.showAlert(
            'Updated!',
            'Homework updated successfully!',
            'success',
          );
          this.buttonText='Update Homework';
        } else {
          this.alertService.showAlert(
            'Alert!',
            'Homework/Assignments already added for this date',
            'alert',
          );
        }
      },
      async () => {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert', 'Something went wrong!', 'alert');
      },
    );
  }
  getRecentHomeWork(subjectId:any, classId:any){
    const sectionId=0;
    this.commonService.getRecentHomeWork(subjectId, classId, sectionId).subscribe((resp)=>{
      if(resp?.status === 200){
        const recentHomeWork=resp?.body;
        this.buttonText="Update Homework";
        this.homeworkForm.patchValue({
          homeWorkId: recentHomeWork.homeworkId,
          classId: recentHomeWork.classId,
          subjectId: recentHomeWork.subjectId,
          workSubmissionDate: recentHomeWork.workSubmissionDate,
          workTitle: recentHomeWork.workTitle,
          workContent: recentHomeWork.workContent,
        });
      }else{
        this.buttonText="Upload Homework";
      }
    })
  }

  goToUploadHomework(){
    this.router.navigate(["/apps/upload-homework"]);
  }
  
  goToUploadAssignment(){
    this.router.navigate(["/apps/upload-assignment"]);
  }

  goToDashboard(){
    this.router.navigate(["/apps/dashboard"]);
  }
}
