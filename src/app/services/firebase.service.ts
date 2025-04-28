import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.prod';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private platform: Platform) { }
  public async initialize(): Promise<void> {
    if (this.platform.is('capacitor')) {
      return;
    }

    initializeApp(environment.firebaseConfig);
  }

  public async signInWithGoogle(): Promise<void> {
    await FirebaseAuthentication.signInWithGoogle({
      mode: 'redirect',
      scopes: ['https://www.googleapis.com/auth/userinfo.email'],
    });
  }
}
