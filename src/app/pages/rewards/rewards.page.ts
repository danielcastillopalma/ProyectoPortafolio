import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,  IonItem, IonButton, IonLabel, IonPopover } from '@ionic/angular/standalone';
import { ApirestService } from 'src/app/services/apirest.service';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
  standalone: true,
  imports: [IonContent,  CommonModule, FormsModule, IonPopover,  IonItem, IonButton, IonLabel]
})
export class RewardsPage implements AfterViewInit {
  rewards: { id_recom: number, name: string; desc: number, ptj: number }[] = [];
  puntos: any = 0;
  constructor(private api: ApirestService, private toast: AlertService) { }

  ngAfterViewInit() {
    this.getRewards();
    this.getPuntos();

  }
  preventClick(event: Event) {
    event.stopPropagation();
  }

  async getRewards() {
    const response = await this.api.getRewards();

    for (let reward of response) {
      const [id_recom, name, desc, ptj] = reward;
      this.rewards.push({ id_recom, name, desc, ptj });
    }
  }
  async canjearRecompensa(id: number, recompensa: string) {
    const email = (await FirebaseAuthentication.getCurrentUser()).user?.email;
    if (email) {
      try {
        this.api.canjearRecompensa(email, id, recompensa);
        await this.getPuntos();
      } catch (error) {
        console.error("Error al canjear la recompensa");
      }
    }


  }

  async getPuntos() {
    const email = (await FirebaseAuthentication.getCurrentUser()).user?.email;

    if (email) {
      try {
        const response = await this.api.getPuntosUsuario(email);

        this.puntos = response;
        console.log("Puntos obtenidos:", response);

      } catch (error) {
        this.toast.alert("Error", "DuocUC", "No se pudo obtener el puntaje.", ["Aceptar"]);
        console.error("Error al obtener puntos:", error);
      }

    } else {
      this.toast.alert("Sin sesión iniciada", "", "No podrá canjear recompensas sin una sesión iniciada.", ["Aceptar"]);
      console.error("No hay un usuario autenticado.");
    }
  }

}
