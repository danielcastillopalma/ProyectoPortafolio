import { Injectable, Injector } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { EmailService } from './email/email.service';
import { api } from '../shared/constants/link-api';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  private _emailService!: EmailService;

  constructor(private injector: Injector) { }
  //ESTO VERIFICA SI HAY UN USUARIO CON ESE CORREO SI NO LO CREA (SÓLO SI ES INSTITUCIONAL)
  public async getEmail(email: string, displayName: string) {
    try {
      const response = await fetch(`${api}/api/querys/${encodeURIComponent(email)}`);

      if (response.status === 404) {
        // No encontrado → crear usuario
        const createResponse = await fetch(`${api}/api/querys`, {
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
  //ESTO OBTIENE LA LISTA DE PUNTOSVERDES
  public async getPuntosVerdes() {
    try {
      const response = await fetch(`${api}/api/mapa`);
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
  //ESTO OBTIENE LA LISTA DE USUARIOS Y SUS PUNTOS
  public async getRankingUsuarios() {
    try {
      const response = await fetch(`${api}/api/ranking`);
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
  public async getRewards() {
    try {
      const response = await fetch(`${api}/api/rewards`);
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor al tratar de obtener los datos de recompensas');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  private get email(): EmailService {
    if (!this._emailService) {
      this._emailService = this.injector.get(EmailService);
    }
    return this._emailService;
  }

  public async canjearRecompensa(email: string, id_recom: number, nomRecom: string) {
    try {
      const createResponse = await fetch(`${api}/api/rewards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo_usuario: email,
          idRec: id_recom,
        }),
      });

      if (!createResponse.ok) {
        throw new Error('Error al canjear Recompensa');
      }

      const nombre = (await FirebaseAuthentication.getCurrentUser()).user?.displayName;
      this.email.sentEmail(email, nombre!, nomRecom); // accede usando el getter

      return await createResponse.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async enviarEmail(email: string, asunto: string, content: string) {
    try {
      const createResponse = await fetch(`${api}/api/enviar-correo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "to": email,
          "asunto": asunto,
          "mensaje": content
        }),
      });

      if (!createResponse.ok) {
        throw new Error('Error al enviar correo.');
      }

      return await createResponse.json();
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
      const createResponse = await fetch(`${api}/api/aportes`, {
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
      const response = await fetch(`${api}/api/qr/${encodeURIComponent(qr)}`);
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


  public async getPuntosUsuario(email: string) {
    try {
      const response = await fetch(`${api}/api/rewards/${encodeURIComponent(email)}`);
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
  public async getRangos() {
    try {
      const response = await fetch(`${api}/api/rewards/lvl`);
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      const rangos = data.map((item: any[]) => ({
        id: item[0],
        nombre: item[1],
        puntajeMinimo: item[2],
      }));
      return rangos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async postBlog(
    photoBase64: string,
    email: string,
    mensaje: string,
    tipoConsulta: string
  ) {
    try {
      // Elimina la cabecera 'data:image/...;base64,' si viene incluida
      let base64 = photoBase64;
      if (photoBase64.startsWith('data:image')) {
        base64 = photoBase64.split(',')[1];
      }

      if (tipoConsulta === "Reporte") {
        const response = await fetch(`${api}/api/blog/reporte`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageBase64: base64,
            correo_usuario: email,
            mensaje: mensaje
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al crear el reporte: ${errorText}`);
        }

        return await response.json();
      } else if (tipoConsulta == "Sugerencia") {
        const response = await fetch(`${api}/api/blog/sugerencia`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageBase64: base64,
            correo_usuario: email,
            mensaje: mensaje
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al crear el reporte: ${errorText}`);
        }

        return await response.json();
      }

      return null;

    } catch (error) {
      console.error('Error al enviar el reporte:', error);
      return null;
    }
  }
  //Aca consigo los aportes del usuario
  async getAportesUsuario(correo: string) {
    try {
      const response = await fetch(`${api}/api/aportes/${encodeURIComponent(correo)}`);
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
