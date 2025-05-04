import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
