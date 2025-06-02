import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.prod';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { ApirestService } from './apirest.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private platform: Platform, private router: Router, private alert: AlertService, private api: ApirestService) {

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
    console.log("ENTRADA A VALIDAR USUARIO");

    const result = await FirebaseAuthentication.getCurrentUser();
    const email = result.user?.email + '';
    const name = result.user?.displayName || 'Usuario Nuevo';

    console.log("correo:", email);
    console.log("nombre:", name);
    console.log("datos:", JSON.stringify(result));

    if (!email) return false;

    // Verificar que el correo pertenece a dominios permitidos
    const domain = email.split('@')[1];
    const allowedDomains = ['duoc.cl', 'duocuc.cl', 'profesor.duoc.cl'];

    if (!allowedDomains.includes(domain)) {
      await this.alert.toast("El correo " + email + " no pertenece a DuocUC");
      this.router.navigateByUrl('login');
      await FirebaseAuthentication.signOut();
      console.log('Acceso restringido a correos institucionales DUOC.');
      return false;
    }

    // Verificar si el email existe en base de datos
    try {
      const userFromDb = await this.api.getEmail(email, name);
      if (!userFromDb) {
        await this.alert.toast("Usuario no registrado en la base de datos");
        await FirebaseAuthentication.signOut();
        return false;
      }

      // Usuario válido
      this.router.navigateByUrl('tabs/home');
      return true;
    } catch (err) {
      console.error('Error al validar usuario en BD:', err);
      await this.alert.toast("Error validando usuario");
      return false;
    }
  }


  public async logout() {
    await FirebaseAuthentication.signOut();
    this.validateCurrentUser();
  }

}
