import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { QRService } from 'src/app/services/qr.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-qrlab',
  templateUrl: './qrlab.page.html',
  styleUrls: ['./qrlab.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class QrlabPage implements OnInit {

  constructor(public qr: QRService, private auth: FirebaseService) { }

  ngOnInit() {
  }

  Scan() {
    this.qr.startScan(0);
  }
  public async signInWithGoogle(): Promise<void> {
    await this.auth.signInWithGoogle();
  }


}


