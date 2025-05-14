import { Injectable } from '@angular/core';
import { AlertController, AlertButton } from '@ionic/angular/standalone';
import { Toast } from '@capacitor/toast';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Titulo",
      subHeader: "Subtitulo",
      message: "Mensaje",
      buttons: ['Action']
    });
    await alert.present();
  }

  async alert(header: string, subHeader: string, message: string, buttons: (string | AlertButton)[]) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons,
    });
    await alert.present();
  }

  async toast(text: string) {
    const presentToast = async () => {
      await Toast.show({
        text
      })
    }
  }
}
