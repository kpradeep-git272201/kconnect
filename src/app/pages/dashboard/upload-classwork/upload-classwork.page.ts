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


  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private iconService: IconService,
  ) { 
    this.iconService.registerIcons();
    this.classworkForm = this.fb.group({
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
}
