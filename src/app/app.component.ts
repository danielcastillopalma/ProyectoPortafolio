import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { FirebaseService } from './services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, CommonModule],
})
export class AppComponent {
  constructor(private firebase: FirebaseService) {
    this.firebase.initialize();
    this.checkIfUserIsLoggedIn();
  }

  async checkIfUserIsLoggedIn() {
    const result = await FirebaseAuthentication.getCurrentUser();

    if (result.user) {
      console.log('Usuario activo detectado');
      this.firebase.validateCurrentUser();
    } else {
      console.log('No hay usuario logueado');
    }
  }
}