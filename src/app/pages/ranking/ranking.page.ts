import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonRow, IonCol } from '@ionic/angular/standalone';
import { ApirestService } from 'src/app/services/apirest.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: true,
  imports: [IonContent, IonRow, IonCol, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel]
})

export class RankingPage implements OnInit {
  userCount = 0;
  userName = "Daniel Castillo";
  userRank = 1;
  users: { name: string; ranking: number }[] = [];

  constructor(private api: ApirestService) { }

  ngOnInit() {
    this.getRanking();
  }
  public async getRanking() {
    const response = await this.api.getRankingUsuarios();
    for (let user of response) {
      const [name, ranking] = user;
      this.users.push({ name, ranking });
    }
  }

}
