import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.page.html',
  styleUrls: ['./upload-assignment.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class UploadAssignmentPage implements OnInit {

  @ViewChild('hiddenDateInput') dateInput!: ElementRef;
  assignmentForm: FormGroup;
  classList: any = [];
  subjectList:any = [];
  submitionDate: string = moment().format('YYYY-MM-DD');
  selectedDate: string = '';
  recentHomeWork: any;
  buttonText="Upload Assignment";
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private iconService: IconService,
    private router: Router
  ) {
    this.iconService.registerIcons();
    this.assignmentForm = this.fb.group({
      assignmentId: [''],
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
    this.assignmentForm.controls['workSubmissionDate'].setValue(event.target.value);
  }
  onClassChange(event: any) {
    this.assignmentForm.patchValue({ classId: event.detail.value });
    this.getSubjectListClassWise(event.detail.value);
  }

  onSubjectChange(event: any){
    const subjectId=event.detail.value;
    const classId=this.assignmentForm.controls["classId"]?.value;
    if(subjectId && classId != null){
      this.getRecentAssignment(subjectId, classId);
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

  async submitAssignment() {
    if (this.assignmentForm.invalid) {
      this.assignmentForm.markAllAsTouched();
      return;
    }

    if(this.buttonText=='Update Assignment'){
      this.updateAssignment();
      return;
    }
    const payload = this.assignmentForm.value;

    await this.loadingService.showLoading();
    this.commonService.uploadHomeWork(payload).subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp.status === 200) {
          this.alertService.showAlert(
            'Uploaded!',
            'Assigment uploaded successfully!',
            'success',
          );
          this.assignmentForm.reset();
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

  async updateAssignment(){
    const payload = this.assignmentForm.value;
    await this.loadingService.showLoading();
    const assignmentId=payload.assignmentId;
    delete payload['homeWorkId'];
    this.commonService.updateAssignment(payload, assignmentId).subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp.status === 200) {
          this.alertService.showAlert(
            'Updated!',
            'Assigment updated successfully!',
            'success',
          );
          this.buttonText='Update Assignment';
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
  getRecentAssignment(subjectId:any, classId:any){
    const sectionId=0;
    this.commonService.getRecentAssignment(subjectId, classId, sectionId).subscribe((resp)=>{
      if(resp?.status === 200){
        const recentHomeWork=resp?.body;
        this.buttonText="Update Assignment";
        this.assignmentForm.patchValue({
          assignmentId: recentHomeWork.homeworkId,
          classId: recentHomeWork.classId,
          subjectId: recentHomeWork.subjectId,
          workSubmissionDate: recentHomeWork.workSubmissionDate,
          workTitle: recentHomeWork.workTitle,
          workContent: recentHomeWork.workContent,
        });
      }else{
        this.buttonText="Upload Assignment";
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
