import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-upload-homework',
  templateUrl: './upload-homework.page.html',
  styleUrls: ['./upload-homework.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UploadHomeworkPage implements OnInit {
  homeworkForm: FormGroup;
  classList: any = [];
  subjectList = [
    { id: 6, name: 'Math' },
    { id: 7, name: 'English' },
  ];
  todayDate: string = moment().format('YYYY-MM-DD');

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private iconService: IconService
  ) {
    this.iconService.registerIcons();
    this.homeworkForm = this.fb.group({
      classId: [null, Validators.required],
      subjectId: [null, Validators.required],
      workSubmissionDate: [this.todayDate],
      workTitle: ['', Validators.required],
      workContent: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getClassList();
  }

  onClassChange(event: any) {
    this.homeworkForm.patchValue({ classId: event.detail.value });
  }

  async getClassList() {
    await this.loadingService.showLoading();
    this.commonService.getClassList().subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp) {
          this.classList = resp.body;
        }
      },
      async () => {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert!', 'Something went wrong!', 'alert');
      }
    );
  }

  async submitHomework() {
    if (this.homeworkForm.invalid) {
      this.homeworkForm.markAllAsTouched(); 
      return;
    }

    const payload = this.homeworkForm.value;

    await this.loadingService.showLoading();
    this.commonService.uploadHomeWork(payload).subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp.status === 200) {
          this.alertService.showAlert('Uploaded!', 'Homework uploaded successfully!', 'success');
          this.homeworkForm.reset();
        }else{
          this.homeworkForm.reset();
          this.alertService.showAlert('Alert!', 'Homework/Assignments already added for this date', 'alert');
        }
      },
      async () => {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert', 'Something went wrong!', 'alert');
      }
    );
  }
}
