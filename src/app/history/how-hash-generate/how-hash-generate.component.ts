import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Winner } from 'src/app/models/ticket/winner.entity';
import { TicketService } from 'src/app/services/ticket/ticket.service';
@Component({
  selector: 'app-how-hash-generate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-hash-generate.component.html',
  styleUrl: './how-hash-generate.component.scss'
})
export class HowHashGenerateComponent {
  jackpots: Winner[] = [];

  constructor(
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.loadJackpots();
  }

  loadJackpots(): void {
    this.ticketService.getRecentJackpots().subscribe({
      next: (response) => {
        this.jackpots = response.map((res: Winner) => {
          const timestamp = res.jackpot.draw_date
          const date = new Date(timestamp);
          const formattedDate = date.getFullYear() + '/' +
            String(date.getMonth() + 1).padStart(2, '0') + '/' +
            String(date.getDate()).padStart(2, '0') + ' ' +
            String(date.getHours()).padStart(2, '0') + ':' +
            String(date.getMinutes()).padStart(2, '0') + ':' +
            String(date.getSeconds()).padStart(2, '0');

          res.jackpot.draw_date = formattedDate
          return res;
        })
      }
    })
  }
}
