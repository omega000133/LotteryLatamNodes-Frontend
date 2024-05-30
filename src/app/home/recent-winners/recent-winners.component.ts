import { Component, OnInit } from '@angular/core';
import { RecentWinnerComponent } from '../recent-winner/recent-winner.component';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Winner } from 'src/app/models/ticket/winner.entity';

@Component({
  selector: 'app-recent-winners',
  standalone: true,
  templateUrl: './recent-winners.component.html',
  styleUrl: './recent-winners.component.scss',
  imports: [CommonModule, RecentWinnerComponent],
})
export class RecentWinnersComponent implements OnInit {
  winners: Winner[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTopWinners();
  }

  loadTopWinners(): void {
    this.ticketService.getTopWinners().subscribe({
      next: (winners: Winner[]) => {
        this.winners = winners;
      },
      error: (error) => {
        Swal.fire('Error', 'Error loading the winners', 'error');
      },
    });
  }
}
