import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonRow, IonCol } from '@ionic/angular/standalone';
import { ApirestService } from 'src/app/services/apirest.service';
import { PhotoaiService } from 'src/app/services/photoai.service';
import { QRService } from 'src/app/services/qr.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ResiduosCheckService } from 'src/app/services/residuos-check.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';


@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonRow, IonCol, CommonModule]
})
export class CamaraPage implements OnInit {
  resultadoVisionAI: any;
  base64Image: string | null = null;
  constructor(private toast: AlertService, private check: ResiduosCheckService, private qr: QRService, private api: ApirestService, private photoai: PhotoaiService) { }
  resultadoqr: string = "resultado";
  idpuntoverde: number = 0;
  async ngOnInit() {
    console.log('ngAfterViewInit ejecutado');
    this.aportes = await this.getAportes();
    console.log(this.aportes);

  }
  aportes: any = []; // array de arrays de strings
  sinAportes = false; // para mostrar mensaje si está vacío


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
      //console.log('Resultado de Google Vision:', resultado);
      this.photoai.procesarJSON(resultado);
      if (this.check.compareResiduos(this.photoai.procesarJSON(resultado), this.resultadoqr)) {
        console.log("acá entra");
        const user = await FirebaseAuthentication.getCurrentUser()
        //console.log("foto: ", this.base64Image);
        //console.log("usuario: ", user.user?.email);
        //console.log("idpv: ", this.idpuntoverde)
        await this.api.postAporte(this.base64Image, user.user?.email, this.idpuntoverde);

        this.toast.alert("Aporte ecológico", "Duoc viña", "Aporte Aceptado", [{
          text: "Aceptar",
          handler: () => {
            this.getAportes();
            window.location.reload();
          }
        }]);
      } else {
        console.log("acá no entra");
        this.toast.alert("Aporte ecológico", "Duoc viña", "Aporte NO Aceptado", ['Aceptar']);
      };
    } catch (error) {
      console.error('Error al capturar o analizar la foto: ', error);
    }
  }

  public async getAportes() {
    try {
      const email = (await FirebaseAuthentication.getCurrentUser()).user?.email;
      const response = await this.api.getAportesUsuario(email!);

      if (response && response.length > 0) {
        return response;
      } else {
        this.sinAportes = true;
        return [];

      }
    } catch (error) {
      console.error("Error al obtener los aportes");
      this.sinAportes = true;
      return [];
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
          this.resultadoqr = JSON.stringify(resultado.tipos);
          console.log(resultado.idPunto);
          this.idpuntoverde = resultado.idPunto;
          await this.toast.alert(
            "Punto escaneado.",
            "DuocUC",
            "Este punto acepta: " + resultado.tipos[0],
            [
              {
                text: "Aportar",
                handler: () => {
                  this.tomarfoto();
                }
              }
            ]
          );
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
