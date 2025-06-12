import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonLabel } from '@ionic/angular/standalone';
import { ApirestService } from 'src/app/services/apirest.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonButton, IonLabel]
})
export class RewardsPage implements OnInit {

  constructor(private api: ApirestService) { }
  rewards: { name: string; desc: number, ptj: number }[] = [];
  ngOnInit() {
    this.getRewards();
    console.log(this.rewards);
  }

  async getRewards() {
    const response = await this.api.getRewards();

    for (let reward of response) {
      const [name, desc, ptj] = reward;
      this.rewards.push(name, desc, ptj);
    }
  }

}
