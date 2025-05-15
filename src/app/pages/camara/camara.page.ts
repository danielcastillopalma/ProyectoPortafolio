import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { QRService } from 'src/app/services/qr.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [IonContent]
})
export class CamaraPage implements OnInit {

  constructor(private qr: QRService) { }

  ngOnInit() {
    this.qr.startScan();
  }

}
