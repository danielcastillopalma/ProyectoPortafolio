import { Injectable } from '@angular/core';
import { ApirestService } from '../apirest.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private api: ApirestService) { }

  async sentEmail(email: string, nombre: string, recompensa: string) {
    const asunto: string = "Haz canjeado una recompensa en PuntoVerdeApp";
    const mensaje: string = `
    <h2>¡Gracias por reciclar en Duoc!</h2>
    <p>
    Hola ${nombre} haz canjeado la siguiente recompensa: 
    </p>
    <br>
    <p>
      ${recompensa}
    </p>
    <br>
    <p>
    Te enviaremos un correo notificando cuando hayamos terminado de procesar tu recompensa.
    </p>
    <br>
    <p>
    Gracias por cuidar el medioambiente con nosotros, esperamos que sigas canjeando recompensas!
    </p>
    <br>
    <br>
    <p>
    Equipo de PuntoVerdeApp.
    </p>
    <br>
    <br>
    <p>
    Este correo fue generado de forma automática. 
    </p>
    `;
    try {
      this.api.enviarEmail(email, asunto, mensaje)
    } catch (error) {
      console.error("Error al tratar de enviar el correo.Error: ", error)

    }
  }
}
