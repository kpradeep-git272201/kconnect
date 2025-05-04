import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { IconService } from '../services/icon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class FooterPage implements OnInit {
  loggedUser: any;

  constructor(private iconService: IconService,
    private router: Router
  ) {
    this.iconService.registerIcons();
   }

  ngOnInit() {
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
}
