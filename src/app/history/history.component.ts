import { Component } from '@angular/core';
import { SpinnerService } from '../services/spinner/spinner.service';
import { HeaderComponent } from '../home/header/header.component';
import { WinningHistoryComponent } from './winning-history/winning-history.component';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HeaderComponent, WinningHistoryComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  text: string = 'history';
  constructor(private spinnerService: SpinnerService) { }
  ngOnInit(): void {
    this.spinnerService.hideSpinner()
  }
}
