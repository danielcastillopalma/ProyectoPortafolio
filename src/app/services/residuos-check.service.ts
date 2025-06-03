import { Injectable } from '@angular/core';
import { traducirResiduo } from '../shared/constants/tipo-residuo.ts';

@Injectable({
  providedIn: 'root'
})
export class ResiduosCheckService {

  constructor() { }

  public compareResiduos(tiposGoogleAI: any, arrayPhoto: any) {
    const umbral = 0.8;
    const tiposAIfiltrados = tiposGoogleAI
      .filter(residuo => residuo.puntuacion > umbral)
      .map(residuo => residuo.descripcion);
    console.log("TIPOS FILTRADOS: ", tiposAIfiltrados);
    let aux = 0;
    for (const residuo of JSON.parse(arrayPhoto)) {
      for (const resi of tiposAIfiltrados) {
        if (resi.toLowerCase().includes(traducirResiduo(residuo))) {
          aux++;
        }
      }
    }
    if (aux > 0) {
      console.log("aux: ", aux);
      return true;
    } else {
      return false;
    }
  }




}
