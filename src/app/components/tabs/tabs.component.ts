import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [ IonIcon, IonTabBar, IonTabButton, IonTabs]
})

export class TabsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
