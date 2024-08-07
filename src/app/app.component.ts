import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerService } from './services/spinner/spinner.service';
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule, SpinnerComponent],
  standalone: true
})
export class AppComponent {
  title = 'Loteria Latam Nodes';

  showSpinner = false;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.spinner$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.showSpinner = data ? data : false;
      });
    });
  }
}
