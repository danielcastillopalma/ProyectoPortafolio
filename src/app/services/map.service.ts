import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Marker } from '../interfaces/marker';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: L.Map;
  //lat: number, lng: number, label: string, icon: string
  private Markers: Marker[] = [
    { lat: -33.033694, lng: -71.533163, label: 'Reciclaje de Electrónicos', icon: 'assets/mapIcons/electronics.png' },
    { lat: -33.034056, lng: -71.533997, label: 'Reciclaje de Plástico', icon: 'assets/mapIcons/plastic.png' },

  ]
  private bounds = L.latLngBounds(
    [-33.035552, -71.536505],
    [-33.0330, -71.5320]
  );

  constructor() { }

  InitializeMap(containerId: string = 'map') {
    this.map = L.map(containerId, {
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
      maxBounds: this.bounds,
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Agrega polígono
    this.addPolygon();

    this.addMarkers();

    setTimeout(() => this.map.invalidateSize(), 100);
  }

  private addPolygon() {
    if (!this.map) return;
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
    ]).addTo(this.map);
  }

  // ⚠️ Usa esto para acceder desde otras funciones
  getMap(): L.Map {
    if (!this.map) {
      throw new Error("Mapa no inicializado. Llama primero a InitializeMap().");
    }
    return this.map;
  }

  // Puedes crear funciones que usen el mapa así:
  public flyToLocation(lat: number, lng: number, zoom: number = 17) {
    this.getMap().flyTo([lat, lng], zoom);
  }

  public addMarker(lat: number, lng: number, label: string, iconUrl: string) {
    const customIcon = L.icon({
      iconUrl: iconUrl,
      iconSize: [30, 30], // puedes ajustar el tamaño según el icono
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.getMap());

    if (label) {
      marker.bindPopup(label);
    }
  }
  public addMarkers(marcadores: Marker[] = this.Markers) {
    for (let marcador of marcadores) {
      this.addMarker(marcador.lat, marcador.lng, marcador.label, marcador.icon)
    }
  }
}
