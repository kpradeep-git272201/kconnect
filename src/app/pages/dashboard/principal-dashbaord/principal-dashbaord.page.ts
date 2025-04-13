import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconService } from 'src/app/services/icon.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-principal-dashbaord',
  templateUrl: './principal-dashbaord.page.html',
  styleUrls: ['./principal-dashbaord.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class PrincipalDashbaordPage implements OnInit {
  user: any;

  constructor(private iconService: IconService,
    private commonService: CommonService
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
