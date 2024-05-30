import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Summary } from 'src/app/models/ticket/summary.entity';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
})
export class SummaryComponent implements OnInit {
  address: string = '';
  summaryData: Summary = {
    latest_jackpot_amount: '',
    total_tickets: '',
    participant_tickets: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['address']) {
        this.address = params['address'];
        this.loadSummaryData(this.address);
      } else {
        this.showError();
      }
    });
  }

  loadSummaryData(address: string): void {
    this.ticketService.getAddressSummary(address).subscribe({
      next: (summary: Summary) => {
        this.summaryData = summary;
      },
      error: (error) => {
        console.error('Error fetching summary data:', error);
        this.showError();
      },
    });
  }

  showError(): void {
    Swal.fire({
      title: 'Error',
      text: 'No address provided in the URL or failed to fetch data!',
      icon: 'error',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/home']);
      }
    });
  }
}
