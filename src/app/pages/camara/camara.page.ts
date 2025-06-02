import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonRow, IonCol } from '@ionic/angular/standalone';
import { ApirestService } from 'src/app/services/apirest.service';
import { QRService } from 'src/app/services/qr.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonRow, IonCol]
})
export class CamaraPage implements OnInit {

  constructor(private qr: QRService, private api: ApirestService) { }
  resultadoqr: string = "resultado";
  ngOnInit() {
    //this.qr.startScan();
  }

  public async openQR() {
    try {
      const result = await this.qr.startScan();

      if (result) {
        // aqui extraigo el https del qr para procesar
        const code = result.replace(/^https:\/\//, '');

        console.log('Código limpio:', code);
        const resultado = await this.api.getQrInfo(code);
        if (resultado) {
          this.resultadoqr = JSON.stringify(resultado);
        }


      } else {
        console.warn('No se escaneó ningún QR.');
      }
    } catch (error) {
      console.error(error)
      throw error;
    }

  }

}
