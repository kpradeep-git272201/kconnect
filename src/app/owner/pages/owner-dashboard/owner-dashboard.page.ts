import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { SharedModule } from 'src/app/shared/shared.module';
@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.page.html',
  styleUrls: ['./owner-dashboard.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class OwnerDashboardPage implements OnInit {
  user: any;

  constructor(private commonService: CommonService,
    private iconService: IconService
  ) {
    this.iconService.registerIcons();
   }

  ngOnInit() {
    this.user = this.commonService.getLoggedUser();
  }

  logout(){
    this.commonService.getLogout();
  }
}
