import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonCard, IonLabel, IonButton, IonItemOptions, IonItemOption, IonIcon, IonItemSliding, IonItem, IonThumbnail, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { RangoService } from 'src/app/services/rango/rango.service';
import { ApirestService } from 'src/app/services/apirest.service';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonIcon, IonButton, IonItemOption, IonItemOptions, IonItemSliding, IonItem, IonThumbnail, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, RouterModule, IonLabel],
})
export class HomePage implements AfterViewInit {
  nombre: string = 'nombre';
  correo: string = 'correo';
  foto: string = 'foto';
  rango1: string = 'rango';
  puntos: number = 0;
  constructor(private route: Router, private auth: FirebaseService, private rango: RangoService, private api: ApirestService) { }
  ngAfterViewInit(): void {
    this.getData()
  }
  async logout() {
    this.auth.logout();
  }

  async getData() {
    this.nombre = (await FirebaseAuthentication.getCurrentUser()).user?.displayName!;
    this.correo = (await FirebaseAuthentication.getCurrentUser()).user?.email!;
    this.foto = (await FirebaseAuthentication.getCurrentUser()).user?.photoUrl!;
    this.puntos = await this.api.getPuntosUsuario(this.correo);
    this.rango1 = (await this.rango.obtenerRango(this.puntos));
  }

  router(ruta: string) {
    this.route.navigateByUrl('tabs/blog');
  }
}




