import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonRow, IonCol } from '@ionic/angular/standalone';
import { ApirestService } from 'src/app/services/apirest.service';
import { PhotoaiService } from 'src/app/services/photoai.service';
import { QRService } from 'src/app/services/qr.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonRow, IonCol]
})
export class CamaraPage implements OnInit {
  resultadoVisionAI: any;
  base64Image: string | null = null;
  constructor(private qr: QRService, private api: ApirestService, private photoai: PhotoaiService) { }
  resultadoqr: string = "resultado";
  ngOnInit() {
    //this.qr.startScan();
  }

  async tomarfoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
      this.base64Image = image.base64String || '';
      console.log('Imagen capturada: ', this.base64Image);

      const resultado = await this.photoai.analyzeImage(this.base64Image);
      console.log('Resultado de Google Vision:', resultado);
      this.resultadoVisionAI = resultado;
    } catch (error) {
      console.error('Error al capturar o analziar la foto: ', error);
    }
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
          await this.tomarfoto();
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
