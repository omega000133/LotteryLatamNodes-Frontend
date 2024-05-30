import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterModule],
  standalone: true,
})
export class HeaderComponent {
  @Input() text: string = '';
}
