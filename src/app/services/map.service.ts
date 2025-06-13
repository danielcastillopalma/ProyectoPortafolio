import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Marker } from '../interfaces/marker';
import { ApirestService } from './apirest.service';
import { traducirResiduo } from '../shared/constants/tipo-residuo.ts';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  public tipoResiduoSeleccionado: string | null = null;

  //lat: number, lng: number, label: string,descripcion:string, icon: string
  private Markers: Marker[] = [
    //{ lat: -33.033694, lng: -71.533163, label: 'Reciclaje de Electrónicos', icon: 'assets/mapIcons/electronics.png' },
    // { lat: -33.034056, lng: -71.533997, label: 'Reciclaje de Plástico', icon: 'assets/mapIcons/plastic.png' },
  ]
  //ACA DEFINO LOS LIMITES DEL MAPA
  private bounds = L.latLngBounds(
    [-33.035552, -71.536505],
    [-33.0330, -71.5320]
  );
  constructor(private api: ApirestService, private alert: AlertService) { }
  //FUNCIÓN PRINCIPAL
  async InitializeMap(containerId: string = 'map') {
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

    // this.addMarkers();
    await this.getPuntosVerdes(this.tipoResiduoSeleccionado);

    setTimeout(() => this.map.invalidateSize(), 100);
  }
  //ESTA FUNCIÓN OBTIENE LOS PUNTOS VERDES DESDE LA API REST
  public async getPuntosVerdes(tipoSeleccionado: string | null = null) {
    console.log("Tipo seleccionado1: ", tipoSeleccionado);
    const resultado = await this.api.getPuntosVerdes();
    const puntosVerdes = resultado.map(i => ({
      nombre: i[0],
      latitud: i[1],
      longitud: i[2],
      descripcion: i[3],
      tipoResiduo: i[4]
    }));
    console.log("Puntos verdes: ", puntosVerdes)

    // Limpia los marcadores anteriores
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    const filtrados = tipoSeleccionado
      ? puntosVerdes.filter(p => p.tipoResiduo === tipoSeleccionado)
      : puntosVerdes;
    console.log("Filtrados: ", filtrados);
    console.log("largof: ", filtrados.length);
    if (filtrados.length == 0) {
      this.alert.alert("No hay puntos disponibles", "DuocUC", "Lamentablemente no hay puntos disponibles para ese tipo de residuo, intenta más tarde.", ["Aceptar"])
    }

    for (let punto of filtrados) {
      const marker = this.addMarker(
        punto.latitud,
        punto.longitud,
        punto.nombre,
        `assets/mapIcons/${traducirResiduo(punto.tipoResiduo)}.png`
      );
      this.markers.push(marker);

    }

    console.log(filtrados);
  }


  //ESTA FUNCION AÑADE EL POLIGONO AZUL QUE MUESTRA LA SEDE (NO TOCAR)
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
  //NO SÉ QUE HACE, LA SAQUE DE LA DOCUMENTACIÓN, AUN NO LA USO.
  getMap(): L.Map {
    if (!this.map) {
      throw new Error("Mapa no inicializado. Llama primero a InitializeMap().");
    }
    return this.map;
  }
  //NO SÉ QUE HACE, LA SAQUE DE LA DOCUMENTACIÓN, AUN NO LA USO.
  public flyToLocation(lat: number, lng: number, zoom: number = 17) {
    this.getMap().flyTo([lat, lng], zoom);
  }
  //ESTA FUNCION CREA EL MARCADOR QUE USAREMOS DESPUÉS.
  public addMarker(lat: number, lng: number, label: string, iconUrl: string): L.Marker {
    const customIcon = L.icon({
      iconUrl: iconUrl,
      iconSize: [30, 30],
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.getMap());

    if (label) {
      marker.bindPopup(label);
    }

    return marker;
  }

  //ESTA FUNCIÓN AÑADE LOS MARCADORES QUE EXTRAEMOS DE LA BASE DE DATOS.
  public addMarkers(marcadores: Marker[]) {
    for (let marcador of marcadores) {
      this.addMarker(marcador.lat, marcador.lng, marcador.label, marcador.icon)
    }
  }
}
