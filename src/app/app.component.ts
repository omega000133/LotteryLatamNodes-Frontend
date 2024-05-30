import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule],
  standalone: true
})
export class AppComponent {
  title = 'Loteria Latam Nodes';
}
