
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { SharedModule } from './shared/shared.module';
import { SideMenuComponent } from "./components/side-menu.component";
import { Platform } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { CommonService } from './services/common.service';
import { StatusBar, Style } from '@capacitor/status-bar';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [SharedModule, SideMenuComponent,HttpClientModule ],
  providers: [CommonService, HTTP] 
})
export class AppComponent {
  showMenu = false; 
  
  constructor(private router: Router,
    private platform: Platform,
    private zone: NgZone
  ) {

    this.initializeApp();
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  
    const loggedUser:any = localStorage.getItem('loggedUser');
    const token = localStorage.getItem('token');
    if (token) {
      const user:any=(loggedUser)? JSON.parse(loggedUser): loggedUser;
      if(user?.roleId==19){ // Emplayee dashbaord
        this.router.navigate(['/apps/dashboard']);
      }else if(user?.roleId==2){  // Owner dashbaord
        this.router.navigate(['/apps/owner-dashbaord']);
      }else if(user?.roleId==3){ // Principle dashbaord
        this.router.navigate(['/apps/principal-dashbaord']);
      }
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isNativePlatform()) {
        StatusBar.setOverlaysWebView({ overlay: false });
        StatusBar.setBackgroundColor({ color: '#563d7c' });
        StatusBar.setStyle({ style: Style.Light });
      }
    });
  }
}
