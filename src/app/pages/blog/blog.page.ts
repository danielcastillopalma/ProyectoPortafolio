import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { IonContent, IonCard, IonSelect, IonTextarea, IonSelectOption, IonHeader, IonToolbar, IonButtons, IonTitle, IonIcon, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonModal } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertService } from 'src/app/services/alert.service';
import { ApirestService } from 'src/app/services/apirest.service';
import { CamaraService } from 'src/app/services/camara/camara.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonSelect, IonTextarea, IonSelectOption, IonCard, IonHeader, IonToolbar, IonButtons, IonTitle, IonIcon, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonModal]

})
export class BlogPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonTextarea) textarea!: IonTextarea;
  seleccionado: string = "Reporte";
  constructor(private camera: CamaraService, private api: ApirestService, private alert: AlertService) { }

  ngOnInit() {
  }


  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  fotoBase64: any = null;
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    this.modal.dismiss(this.name, 'confirm');
    const tipoConsulta = this.seleccionado;
    const mensaje = (await this.textarea.getInputElement()).value;
    const result = await this.api.postBlog(this.fotoBase64, (await FirebaseAuthentication.getCurrentUser()).user?.email!, mensaje, tipoConsulta);
    if (result) {
      this.alert.alert(tipoConsulta, "DuocUC", tipoConsulta + " Creado correctamente", ["Aceptar"]);
    } else {
      this.alert.alert(tipoConsulta, "DuocUC", "Error al crear " + tipoConsulta, ["Aceptar"]);
    }
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes.`;
  }
  handleChange(event: CustomEvent) {
    this.seleccionado = event.detail.value;
  }
  async getPhoto() {
    this.fotoBase64 = await this.camera.getImageFromDevice();
  }
}
