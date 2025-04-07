import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, appsOutline, 
  homeOutline, personCircleOutline, albumsOutline, logOutOutline, schoolOutline, createOutline, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [CommonModule, RouterModule, SharedModule, RouterModule ]
})
export class SideMenuComponent  implements OnInit {

  public appPages = [
    { title: 'Dashboard', url: '/apps/dashboard', icon: 'apps' },
    { title: 'Home', url: '/apps/home', icon: 'home' },
    { title: 'Student Profile', url: '/apps/student-profile', icon: 'person-circle' },
    { title: 'Change Pin', url: '/apps/change-pin', icon: 'create' },
    { title: 'School Profile', url: '/apps/school-profile', icon: 'school' },
    { title: 'About', url: '/apps/about', icon: 'albums' },
    { title: 'Logout', url: '/auth/login', icon: 'log-out' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
 
  constructor(private router: Router) {
    console.log("Side Menu");
    addIcons({ mailOutline,homeOutline, appsOutline,
      paperPlaneOutline, paperPlaneSharp, 
      heartOutline, heartSharp, archiveOutline, logOutOutline,
      archiveSharp, trashOutline, trashSharp, createOutline,
      warningOutline, warningSharp,personCircleOutline, schoolOutline,
      bookmarkOutline, bookmarkSharp, albumsOutline });
  }

  ngOnInit() {}

  getNavigate(p:any){
    if(p.title=="Logout"){
      localStorage.removeItem('loggedUser');
      this.router.navigate([p.url]);
    }else{
      this.router.navigate([p.url]);
    }
  }
}
