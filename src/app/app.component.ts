import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
<<<<<<< HEAD
import { FirebaseService } from './services/firebase.service';
=======
>>>>>>> origin/pchoque

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
<<<<<<< HEAD
  constructor(
    private firebase: FirebaseService
  ) {
    this.firebase.initialize();
    this.firebase.validateCurrentUser();
  }
}
=======
  constructor() {}
}


>>>>>>> origin/pchoque
