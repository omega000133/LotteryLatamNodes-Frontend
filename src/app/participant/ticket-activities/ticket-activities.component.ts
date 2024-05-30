import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket/ticket.entity';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-activities.component.html',
  styleUrl: './ticket-activities.component.scss',
})
export class TicketActivitiesComponent {
  tickets: string[] = [];
  address: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.address = params['address'];
      if (this.address) {
        this.loadTickets(this.address);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No address provided!',
          icon: 'error',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home']);
          }
        });
      }
    });
  }

  loadTickets(address: string, page: number = 1): void {
    this.currentPage = page;
    this.ticketService.getTicketsByAddress(address, page).subscribe({
      next: (response) => {
        this.tickets = response.tickets;
        this.totalPages = response.total_pages;
        this.pages = this.getPages(page, response.total_pages);
      },
      error: (error) => console.error('Error fetching tickets:', error),
    });
  }

  private getPages(currentPage: number, totalPages: number): number[] {
    const rangeSize = 3;
    let start = Math.max(currentPage - Math.floor(rangeSize / 2), 1);
    let end = start + rangeSize - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - rangeSize + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
