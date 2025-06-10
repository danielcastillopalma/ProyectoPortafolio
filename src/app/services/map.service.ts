import { Injectable } from '@angular/core';
import * as L from 'leaflet';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }
  InitializeMap() {
    const bounds = L.latLngBounds(
      [-33.035552, -71.536505],  // esquina suroeste (SW)
      [-33.0330, -71.5320]   // esquina noreste (NE)
    );
    const map = L.map('map', {
      center: [-33.034090, -71.533694],
      zoom: 17,
      maxZoom: 18,
      minZoom: 16,
      zoomControl: true,
      dragging: true,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: true,
      keyboard: false,
      tap: false,
      touchZoom: false,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.polygon([
      [-33.033519, -71.53305],
      [-33.033874, -71.532637],
      [-33.034225, -71.533232],
      [-33.035048, -71.533401],
      [-33.034983, -71.534139],
      [-33.034479, -71.534024],
      [-33.033656, -71.53475],
      [-33.033346, -71.534292],
      [-33.033652, -71.534061],
      [-33.033966, -71.534203],
      [-33.034095, -71.534112],
    ]).addTo(map);

    //Iconos custom
    //ProyectoPortafolio\src\app\pages\mapa\mapa.page.ts
    //ProyectoPortafolio\src\assets\mapIcons\plastic.png
    const plasticIon = L.icon({
      iconUrl: '../../../../assets/mapIcons/plastic.png',
      iconSize: [30, 30], // size of the icon
      //shadowSize: [50, 64], // size of the shadow
      //iconAnchor: [0,0], // point of the icon which will correspond to marker's location
      //shadowAnchor: [0, 0],  // the same for the shadow
      //popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    })
    L.marker([-33.034056, -71.533997], { icon: plasticIon }).addTo(map).bindPopup("Reciclaje de Plástico");

    // Corregir tamaño al cargar
    setTimeout(() => map.invalidateSize(), 100);
  }

}
