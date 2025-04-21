import { Component } from '@angular/core';
<<<<<<< HEAD
import { Route, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
=======
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
>>>>>>> origin/main

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
<<<<<<< HEAD
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonButton],
})
export class HomePage {
  constructor(private route:Router) {}

  router(){
    this.route.navigateByUrl("qrlab");
  }
=======
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {}
>>>>>>> origin/main
}
