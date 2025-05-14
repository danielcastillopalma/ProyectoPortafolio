import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.prod';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private platform: Platform, private router: Router, private alert: AlertService) {

  }
  public async initialize(): Promise<void> {
    if (this.platform.is('capacitor')) {
      return;
    }

    initializeApp(environment.firebaseConfig);
  }

  public async signInWithGoogle(): Promise<void> {
    const result = await FirebaseAuthentication.signInWithGoogle({
      mode: 'redirect',
      scopes: ['https://www.googleapis.com/auth/userinfo.email'],
    });
    this.validateCurrentUser();
  }


  public async validateCurrentUser(): Promise<boolean> {
    console.log("ENTRADA A VALIDAR USUARIO")
    const result = await FirebaseAuthentication.getCurrentUser();
    console.log("correo:", result.user?.email);

    if (result?.user?.email) {
      const email = result.user.email;
      const domain = email.split('@')[1];
      const allowedDomains = ['duoc.cl', 'duocuc.cl', 'profesor.duoc.cl'];

      if (!allowedDomains.includes(domain)) {
        await this.alert.toast("El correo " + email + " no pertence a DuocUC")
        this.router.navigateByUrl('login')

        await FirebaseAuthentication.signOut();
        console.log('Acceso restringido a correos institucionales DUOC.');
        return false;
      }
      this.router.navigateByUrl('tabs/home')
      return true;
    }

    return false;
  }
  public async logout() {
    await FirebaseAuthentication.signOut();
    this.validateCurrentUser();
  }

}
