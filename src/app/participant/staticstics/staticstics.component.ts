import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Statistics } from 'src/app/models/ticket/statistics';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staticstics',
  standalone: true,
  imports: [],
  templateUrl: './staticstics.component.html',
  styleUrl: './staticstics.component.scss',
})
export class StaticsticsComponent {
  address: string = '';
  statistics: Statistics = {
    balance: 0,
    ticket_cost: 0,
    total_tickets: 0,
    current_balance: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.address = params['address'];
      if (this.address) {
        this.loadParticipantStatistics(this.address);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No address provided!',
          icon: 'error',
          confirmButtonText: 'OK',
        }).then(() => this.router.navigate(['/home']));
      }
    });
  }

  loadParticipantStatistics(address: string): void {
    this.ticketService.getParticipantStatistics(address).subscribe({
      next: (data: Statistics) => (this.statistics = data),
      error: () =>
        Swal.fire('Error', 'Failed to load participant statistics.', 'error'),
    });
  }
}
