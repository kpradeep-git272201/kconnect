import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async showAlert(header: string, message: string, type: 'success' | 'warning' | 'alert') {
    let cssType = '';
    switch (type) {
      case 'success': cssType = 'success'; break;
      case 'warning': cssType = 'warning'; break;
      case 'alert': cssType = 'danger'; break;
    }
  
    const alert = await this.alertController.create({
      cssClass: `custom-alert ${cssType}`,
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'custom-ok-button'
        }
      ]
    });
    await alert.present();
  }
  


  async showToast(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    let cssClass = '';
  
    switch (type) {
      case 'success':
        cssClass = 'toast-success';
        break;
      case 'error':
        cssClass = 'toast-error';
        break;
      case 'warning':
        cssClass = 'toast-warning';
        break;
    }
  
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      cssClass: cssClass
    });
  
    await toast.present();
  }
}


