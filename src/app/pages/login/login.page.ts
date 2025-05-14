import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule
  ]

})
export class LoginPage implements OnInit {

  constructor(private auth: FirebaseService, private alert: AlertService) { }

  ngOnInit() {
    this.alert.alert("Punto Verde", "DuocUC Viña del Mar", "Esta aplicación está diseñada exclusivamente para usuarios de Duoc. Debes iniciar sesión con tu correo institucional", ['Aceptar']);
  }
  login() {
    this.auth.signInWithGoogle();
  }
}

