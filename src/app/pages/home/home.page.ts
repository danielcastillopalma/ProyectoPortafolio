import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, RouterModule],
})
export class HomePage {
  constructor(private auth: FirebaseService) { }
  async logout() {
    this.auth.logout();
  }
}





