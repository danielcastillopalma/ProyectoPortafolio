import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonCard, IonLabel, IonButton, IonCardTitle, IonCardContent, IonCardHeader, IonItemOptions, IonItemOption, IonIcon, IonItemSliding, IonItem, IonThumbnail, IonContent } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { RangoService } from 'src/app/services/rango/rango.service';
import { ApirestService } from 'src/app/services/apirest.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, CommonModule, IonCard,  IonCardContent, IonCardTitle, IonCardHeader, IonIcon, IonButton, IonItemOption, IonItemOptions, IonItemSliding, IonItem, IonThumbnail, RouterModule, IonLabel],
})
export class HomePage implements AfterViewInit {
  nombre: string = 'nombre';
  correo: string = 'correo';
  foto: string = 'foto';
  rango1: string = 'rango';
  puntos: number = 0;
  insignia: string = "../assets/Insignias/Sin Rango.png";
  noticias: any = [];
  constructor(private route: Router, private auth: FirebaseService, private rango: RangoService, private api: ApirestService) { }
  ngAfterViewInit(): void {
    this.getData();
    this.getNews();
  }
  async logout() {
    this.auth.logout();
  }

  async getData() {
    try {
      this.nombre = (await FirebaseAuthentication.getCurrentUser()).user?.displayName!;
      this.correo = (await FirebaseAuthentication.getCurrentUser()).user?.email!;
      this.foto = (await FirebaseAuthentication.getCurrentUser()).user?.photoUrl!;
      this.puntos = await this.api.getPuntosUsuario(this.correo);
      this.rango1 = (await this.rango.obtenerRango(this.puntos));
      this.cargarInsignia(this.puntos);
    } catch (error) {
      this.nombre = "Nombre";
      this.correo = "correo@duocuc.cl";
      this.foto = '../assets/photoid.jpg';
      this.puntos = 10;
      this.rango1 = 'Rango';
      this.cargarInsignia(this.puntos);
    }

  }
  async getNews() {
    this.noticias = await this.api.getNews();
  }
  router(ruta: string) {
    this.route.navigateByUrl('tabs/blog');
  }
  cargarInsignia(pts: number) {
    if (pts >= 0 && pts <= 100) {
      this.insignia = "../assets/Insignias/principiante.png";
    } else if (pts >= 101 && pts <= 500) {
      this.insignia = "../assets/Insignias/intermedio.png";
    } else if (pts > 500) {
      this.insignia = "../assets/Insignias/avanzado.png";
    } else {
      this.insignia = "../assets/Insignias/Sin Rango.png";
    }
  }
}




