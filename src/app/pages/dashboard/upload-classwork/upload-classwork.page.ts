import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-upload-classwork',
  templateUrl: './upload-classwork.page.html',
  styleUrls: ['./upload-classwork.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class UploadClassworkPage implements OnInit {
@ViewChild('hiddenDateInput') dateInput!: ElementRef;
  classworkForm: FormGroup;
  classList: any = [];
  subjectList:any = [];
  submitionDate: string = moment().format('YYYY-MM-DD');
  selectedDate: string = '';
  buttonText: string='Upload Classwork';


  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private iconService: IconService,
  ) { 
    this.iconService.registerIcons();
    this.classworkForm = this.fb.group({
      classWorkId: [''],
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
    this.classworkForm.controls['workSubmissionDate'].setValue(event.target.value);
  }
  onClassChange(event: any) {
    this.classworkForm.patchValue({ classId: event.detail.value });
    this.getSubjectListClassWise(event.detail.value);
  }

  onSubjectChange(event: any){
    const subjectId=event.detail.value;
    const classId=this.classworkForm.controls["classId"]?.value;
    if(subjectId && classId != null){
      this.getRecentClassWork(subjectId, classId);
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
    if (this.classworkForm.invalid) {
      this.classworkForm.markAllAsTouched();
      return;
    }
    if(this.buttonText=='Update Classwork'){
      this.updateClasswork();
      return;
    }
    const payload = this.classworkForm.value;

    await this.loadingService.showLoading();
    this.commonService.uploadClassWork(payload).subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp.status === 200) {
          this.alertService.showAlert(
            'Uploaded!',
            'Classwork uploaded successfully!',
            'success',
          );
          this.classworkForm.reset();
        } else {
          this.alertService.showAlert(
            'Alert!',
            'Classwork/Assignments already added for this date',
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

  getRecentClassWork(subjectId:any, classId:any){
    const sectionId=0;
    this.commonService.getRecentClassWork(subjectId, classId, sectionId).subscribe((resp)=>{
      if(resp?.status === 200){
        const recentHomeWork=resp?.body;
        this.buttonText="Update Classwork";
        this.classworkForm.patchValue({
          classWorkId: recentHomeWork.homeworkId,
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
  async updateClasswork(){
    const payload = this.classworkForm.value;
    this.alertService.showAlert('Alert', JSON.stringify(payload), 'alert');
    // await this.loadingService.showLoading();
    // this.commonService.uploadHomeWork(payload).subscribe(
    //   async (resp) => {
    //     await this.loadingService.hideLoading();
    //     if (resp.status === 200) {
    //       this.alertService.showAlert(
    //         'Uploaded!',
    //         'Homework updated successfully!',
    //         'success',
    //       );
    //       this.homeworkForm.reset();
    //     } else {
    //       this.alertService.showAlert(
    //         'Alert!',
    //         'Homework/Assignments already added for this date',
    //         'alert',
    //       );
    //     }
    //   },
    //   async () => {
    //     await this.loadingService.hideLoading();
    //     this.alertService.showAlert('Alert', 'Something went wrong!', 'alert');
    //   },
    // );
  }
}
