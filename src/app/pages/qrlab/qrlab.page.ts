import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton } from '@ionic/angular/standalone';
import { QRService } from 'src/app/services/qr.service';
=======
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
>>>>>>> origin/main

@Component({
  selector: 'app-qrlab',
  templateUrl: './qrlab.page.html',
  styleUrls: ['./qrlab.page.scss'],
  standalone: true,
<<<<<<< HEAD
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class QrlabPage implements OnInit {

  constructor(public qr: QRService) { }
=======
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QrlabPage implements OnInit {

  constructor() { }
>>>>>>> origin/main

  ngOnInit() {
  }

<<<<<<< HEAD
  Scan() {
    this.qr.StartScan();
  }

=======
>>>>>>> origin/main
}

