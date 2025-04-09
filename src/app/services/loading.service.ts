import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: HTMLIonLoadingElement;

  
  constructor(private loadingCtrl: LoadingController) {}


  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      cssClass: 'custom-loading',
      spinner: 'circles', // or 'dots', 'lines'
      backdropDismiss: false
    });
    await this.loading.present();
  }
  
  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }


}
