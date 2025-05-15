import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  IonRouterOutlet
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonContent, IonHeader, IonIcon, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar,IonRouterOutlet]
})

export class TabsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
