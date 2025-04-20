import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, appsOutline, 
  homeOutline, personCircleOutline, albumsOutline, logOutOutline, schoolOutline, createOutline, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { IconService } from '../services/icon.service';
import { Geolocation } from '@capacitor/geolocation';
import { LoadingService } from '../services/loading.service';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [CommonModule, RouterModule, SharedModule, RouterModule ]
})
export class SideMenuComponent  implements OnInit {

  public appPages = [
    { id: 1, title: 'Dashboard', url: '/apps/dashboard', icon: 'apps' },
    { id: 2, title: 'Home', url: '/apps/home', icon: 'home' },
    // { id: 3, title: 'Student Profile', url: '/apps/student-profile', icon: 'person-circle' },
    // { id: 4, title: 'Change Pin', url: '/apps/change-pin', icon: 'create' },
    { id: 5, title: 'School Profile', url: '/apps/school-profile', icon: 'school' },
    { id: 6, title: 'About', url: '/apps/about', icon: 'albums' },
    { id: 7, title: 'Geotagged Location', url: '', icon: 'location' },
    { id: 8, title: 'Logout', url: '/auth/login', icon: 'log-out' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  displaySidemenuPrincipal=[1, 8, 6, 7];
 
  constructor(private router: Router,
    private commonService: CommonService,
    private iconService: IconService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {
    this.iconService.registerIcons();
    addIcons({ mailOutline,homeOutline, appsOutline,
      paperPlaneOutline, paperPlaneSharp, 
      heartOutline, heartSharp, archiveOutline, logOutOutline,
      archiveSharp, trashOutline, trashSharp, createOutline,
      warningOutline, warningSharp,personCircleOutline, schoolOutline,
      bookmarkOutline, bookmarkSharp, albumsOutline });
  }

  ngOnInit() {
    const loggedUser:any = localStorage.getItem('loggedUser');
    if (loggedUser){
      const user:any=(loggedUser)? JSON.parse(loggedUser): loggedUser;
      if(user.roleId==3){
        this.appPages=this.appPages.filter((menu)=>{
          return this.displaySidemenuPrincipal.includes(menu.id);
        })
      }else{
        this.appPages=this.appPages.filter((menu)=>{
          return menu.id != 7;
        })
      }
    } 

  }

  getNavigate(p:any){

    if(p.id==7){
      this.getCurrentLocation();
      return;
    }
    if(p.title=="Logout"){
      localStorage.removeItem('loggedUser');
      this.commonService.getLogout();
    }else{
      this.router.navigate([p.url]);
    }
  }
 async getCurrentLocation() {
    try {
      await this.loadingService.showLoading();
      const perm = await Geolocation.requestPermissions();
      if (perm.location === 'denied') {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert','Location permission denied. Please allow it from settings.', 'alert');
        return;
      }
      if (!navigator.geolocation) {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert','Location services are not available on your device.', 'alert');
        return;
      }
  
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000 
      });
  
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const data={
        "longitude": lng,
        "latitude": lat
        }
        this.commonService.geotaggedLocation(data).subscribe(async (resp)=>{
          if(resp.status==200){
            await this.loadingService.hideLoading();
            this.alertService.showAlert("Success!", "Geotagged Location successfully added!", "success");
          }else{
            await this.loadingService.hideLoading();
            this.alertService.showAlert("Alert!", "Geotagged Location failed!", "alert");
          }
        },async (error)=>{
          await this.loadingService.hideLoading();
          this.alertService.showAlert('Alert!', 'Someting went wrong!', 'alert');
        })
    } catch (err: any) {
      await this.loadingService.hideLoading();
      this.alertService.showAlert('Alert','Failed to get location. Please enable location and try again.', 'alert');
    }
  }
 
}
