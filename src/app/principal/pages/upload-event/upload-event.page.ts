import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterPage } from "../../../footer/footer.page";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-upload-event',
  templateUrl: './upload-event.page.html',
  styleUrls: ['./upload-event.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class UploadEventPage implements OnInit {
  eventForm: FormGroup;
  loggedUser: any;


  constructor(private iconService: IconService,
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
  ) {
    this.iconService.registerIcons();
   }

  ngOnInit() {
    this.eventForm = this.fb.group({
      eventId: [''],
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
    const loggedUser: any = localStorage.getItem('loggedUser');
    let parsedUser: any = loggedUser ? JSON.parse(loggedUser) : null;
    this.loggedUser = parsedUser;
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

  async submitHomework() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const payload = this.eventForm.value;

    await this.loadingService.showLoading();
    this.commonService.uploadEvent(payload).subscribe(
      async (resp) => {
        await this.loadingService.hideLoading();
        if (resp.status === 200) {
          this.alertService.showAlert(
            'Uploaded!',
            'Event uploaded successfully!',
            'success',
          );
          this.eventForm.reset();
        } else {
          this.alertService.showAlert(
            'Alert!',
            'Event already added for this date',
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
