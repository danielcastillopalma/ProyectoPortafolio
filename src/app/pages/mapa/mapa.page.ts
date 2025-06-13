import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSelect, IonList, IonItem, IonSelectOption } from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  imports: [IonContent, CommonModule, FormsModule, IonSelect, IonList, IonItem, IonSelectOption],
})
export class MapaPage implements AfterViewInit {
  public tipoResiduoSeleccionado: string | null = null;
  constructor(private map: MapService) { }

  ngAfterViewInit() {
    this.map.InitializeMap();
  }

  handleChange(event: CustomEvent) {
    this.tipoResiduoSeleccionado = event.detail.value;
    console.log("Tipo residuo selecc: ",this.tipoResiduoSeleccionado)
    this.map.getPuntosVerdes(this.tipoResiduoSeleccionado);
  }

  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }


}
