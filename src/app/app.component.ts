import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet,IonContent } from '@ionic/angular/standalone';
import { FirebaseService } from './services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet,CommonModule],
})
export class AppComponent {
  constructor(
    private firebase: FirebaseService
  ) {
    this.firebase.initialize();
    this.firebase.validateCurrentUser();
  }
}
