import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  imports: [IonContent, CommonModule, FormsModule],
})
export class MapaPage implements AfterViewInit {

  constructor(private map: MapService) { }

  ngAfterViewInit() {
    this.map.InitializeMap();
  }


}
