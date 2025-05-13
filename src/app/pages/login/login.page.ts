import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonItem,
  IonText,
  IonIcon,
  IonLabel,
  IonInput,
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonText,
    IonItem,
    IonIcon,
    IonLabel,
    IonInput,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ]

})
export class LoginPage implements OnInit {

  constructor(private auth:FirebaseService) { }

  ngOnInit() {
  }
  login(){
    this.auth.signInWithGoogle();
  }
}

