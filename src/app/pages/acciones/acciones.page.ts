import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; 
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.page.html',
  styleUrls: ['./acciones.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AccionesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
