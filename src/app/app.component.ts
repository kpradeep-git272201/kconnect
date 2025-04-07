
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { SharedModule } from './shared/shared.module';
import { SideMenuComponent } from "./components/side-menu.component";
import { Platform } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [SharedModule, SideMenuComponent,HttpClientModule ],
 
})
export class AppComponent {
  showMenu = false; 
  
  constructor(private router: Router,
    private platform: Platform,
    private zone: NgZone // NgZone Inject Karo
  ) {

    this.initializeApp();
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isNativePlatform()) {
        StatusBar.setOverlaysWebView({ overlay: false });
        StatusBar.setBackgroundColor({ color: '#563d7c' });
      }
    });
  }
}
