import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Winner } from 'src/app/models/ticket/winner.entity';

@Component({
  selector: 'app-recent-winner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-winner.component.html',
  styleUrl: './recent-winner.component.scss',
})
export class RecentWinnerComponent {
  @Input() winner!: Winner;
  winner_amount: string = '';

  ngOnInit(): void {
    if (this.winner && this.winner.jackpot) {
      this.winner_amount = (this.winner.jackpot.reward * (this.winner.jackpot.reward_percentage / 100)).toFixed(1);
    }
  }
}
