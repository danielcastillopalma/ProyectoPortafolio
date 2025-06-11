import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  constructor() { }

  public async getEmail(email: string, displayName: string) {
    try {
      const response = await fetch(`https://respawnen3.duckdns.org/api/querys/${encodeURIComponent(email)}`);

      if (response.status === 404) {
        // No encontrado → crear usuario
        const createResponse = await fetch('https://respawnen3.duckdns.org/api/querys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            correo_usuario: email,
            nom_usuario: displayName
            // Agrega otros campos si es necesario
          }),
        });

        if (!createResponse.ok) {
          throw new Error('Error al crear el usuario');
        }

        return await createResponse.json();
      }

      if (!response.ok) throw new Error('Error en la consulta');

      return await response.json();

    } catch (error) {
      console.error('Error al validar o crear usuario:', error);
      return null;
    }
  }

  public async getPuntosVerdes() {
    try {
      const response = await fetch(`https://respawnen3.duckdns.org/api/mapa`);
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor al tratar de obtener los datos de Puntos Verdes');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  public async getRankingUsuarios() {
    try {
      const response = await fetch(`https://respawnen3.duckdns.org/api/ranking`);
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor al tratar de obtener los datos de usuarios');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async postAporte(photoBase64: string, email, idpunto) {
    let base64 = photoBase64;
    if (photoBase64.startsWith('data:image')) {
      base64 = photoBase64.split(',')[1];
    }
    console.log("idpunto en api: ", idpunto);
    try {
      const createResponse = await fetch('https://respawnen3.duckdns.org/api/aportes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64,
          correo_usuario: email,
          idpunt: idpunto
        }),
      });

      if (!createResponse.ok) {
        throw new Error('Error al crear el aporte');
      }

      return await createResponse.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  public async getQrInfo(qr: string) {
    try {
      const response = await fetch(`https://respawnen3.duckdns.org/api/qr/${encodeURIComponent(qr)}`);
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


}
