import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RecentWinnersComponent } from './recent-winners/recent-winners.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { CheckAddressComponent } from './check-address/check-address.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HeaderComponent,
    RecentWinnersComponent,
    HowItWorksComponent,
    CheckAddressComponent,
  ],
})
export class HomeComponent {
  text: string = 'home'
}
