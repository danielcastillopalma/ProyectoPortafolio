import { Injectable } from '@angular/core';
import { ApirestService } from '../apirest.service';

@Injectable({
  providedIn: 'root'
})
export class RangoService {

  constructor(private api: ApirestService) {

  }

  public async obtenerRango(ptj: number | number[]): Promise<string> {
    if (Array.isArray(ptj)) {
      ptj = ptj[0];  
    }

    const rangos = await this.api.getRangos();
    console.log('Rangos obtenidos:', rangos);

    const rangosOrdenados = rangos
      .map(r => ({ ...r, puntajeMinimo: Number(r.puntajeMinimo) }))  // Asegurar número
      .sort((a, b) => a.puntajeMinimo - b.puntajeMinimo);

    console.log('Rangos ordenados:', rangosOrdenados);

    let rangoName = "Sin rango";

    for (let rango of rangosOrdenados) {
      if (ptj >= rango.puntajeMinimo) {
        rangoName = rango.nombre;
      } else {
        break;
      }
    }

    return rangoName;
  }

}
