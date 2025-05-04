import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IconService } from 'src/app/services/icon.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterPage } from "../../../footer/footer.page";
import { CommonService } from 'src/app/services/common.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import moment from 'moment';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ViewEventPage implements OnInit {
  @ViewChild('hiddenDateInput') dateInput!: ElementRef;
  currentDate: string = new Date().toISOString().split('T')[0];
  eventData: any=[];
  eventList: any = []; 
  submitionDate: any=this.currentDate;loggedUser: any;
;
  
  constructor(private commonService: CommonService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private iconService: IconService,
    private router: Router
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {
    const currentDate=moment().format("YYYY-MM-DD");
    this.getEvent();
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

  openDatePicker() {
    this.dateInput.nativeElement.click();
  }
  


  onDateChange(event: any) {
    const selectedDate = event.detail.value;
  }
  async getEvent() {
    await this.loadingService.showLoading();
   
    this.commonService.getEvent().subscribe(async (resp) => {
      if(resp?.body.length>0){
        this.eventData=resp.body;
        this.eventList=this.eventData.map((event) => ({
          ...event,
          bgColor: this.getRandomLightColor(),
        }));
        await this.loadingService.hideLoading();
      }else{
        await this.loadingService.hideLoading();
      }
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

  filterEvent(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    this.eventList = this.eventData.filter(event =>
      event.title.toLowerCase().includes(query)
    ).map((event) => ({
      ...event,
      bgColor: this.getRandomLightColor(),
    }));;
  }
  formatDate(event: any) {
    this.submitionDate = event.target.value;
    this.filterEventByDate(this.submitionDate);
  }
  filterEventByDate(date: string) {
    const selectedDate = moment(date).format("YYYY-MM-DD");
  
    this.eventList = this.eventData.filter(event =>
      moment(event.uploadedDate).format("YYYY-MM-DD") === selectedDate
    ).map(e => ({
      ...e,
      bgColor: this.getRandomLightColor(),
    }));
  }
}
