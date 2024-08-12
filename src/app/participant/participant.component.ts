import { Component } from '@angular/core';
import { SummaryComponent } from './summary/summary.component';
import { CountdownComponent } from './countdown/countdown.component';
import { StaticsticsComponent } from './staticstics/staticstics.component';
import { TicketActivitiesComponent } from './ticket-activities/ticket-activities.component';
import { HistoryComponent } from './history/history.component';
import { HeaderComponent } from '../home/header/header.component';
import { SpinnerService } from '../services/spinner/spinner.service';

@Component({
  selector: 'app-participant',
  standalone: true,
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.scss',
  imports: [
    SummaryComponent,
    CountdownComponent,
    StaticsticsComponent,
    TicketActivitiesComponent,
    HistoryComponent,
    HeaderComponent,
  ],
})
export class ParticipantComponent {
  text: string = 'participant';

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.hideSpinner()
  }
}
