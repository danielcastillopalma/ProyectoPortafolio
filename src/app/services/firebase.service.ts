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
    const email = result.user?.email ?? '';
    const name = result.user?.displayName || 'Usuario Nuevo';

    if (!email) return false;

    console.log("correo:", email);
    console.log("nombre:", name);

    // Verificar dominio institucional
    const domain = email.split('@')[1];
    const allowedDomains = ['duoc.cl', 'duocuc.cl', 'profesor.duoc.cl'];

    if (!allowedDomains.includes(domain)) {
      await this.alert.toast("El correo " + email + " no pertenece a DuocUC");
      this.router.navigateByUrl('login');
      await FirebaseAuthentication.signOut();
      return false;
    }

    // Permitir acceso inmediato
    this.router.navigateByUrl('tabs/home');

    // Validación/sincronización en segundo plano
    try {
      const user = await this.api.getEmail(email, name);
      if (!user) {
        console.warn('El usuario no pudo ser creado ni validado, pero ya inició sesión.');
        // Opcional: guardar en localStorage para reintentar luego
        localStorage.setItem('pendingUserSync', JSON.stringify({ email, name }));
      } else {
        localStorage.removeItem('pendingUserSync');
      }
    } catch (err) {
      console.error('Error durante la validación con backend:', err);
      // También puedes almacenar para reintentar
      localStorage.setItem('pendingUserSync', JSON.stringify({ email, name }));
    }

    return true;
  }



  public async logout() {
    await FirebaseAuthentication.signOut();
    this.validateCurrentUser();
  }

}
