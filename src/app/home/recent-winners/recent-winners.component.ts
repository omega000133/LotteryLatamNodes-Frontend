import { Component, OnInit } from '@angular/core';
import { RecentWinnerComponent } from '../recent-winner/recent-winner.component';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Winner } from 'src/app/models/ticket/winner.entity';
import { Router } from '@angular/router'; // Import Router
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-recent-winners',
  standalone: true,
  templateUrl: './recent-winners.component.html',
  styleUrl: './recent-winners.component.scss',
  imports: [CommonModule, RecentWinnerComponent, FormsModule, FontAwesomeModule],
})
export class RecentWinnersComponent implements OnInit {
  winners: Winner[] = [];
  faSearch = faSearch;
  searchAddress = ""

  constructor(private ticketService: TicketService, private router: Router, private spinnerService: SpinnerService) { } // Inject the router

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

  onSubmit() {
    this.spinnerService.showSpinner();
    this.ticketService.checkAddress(this.searchAddress).subscribe({
      next: (response) => {
        this.router.navigate(['/history'], {
          queryParams: { address: this.searchAddress },
        });
      },
      error: (error) => {
        this.spinnerService.hideSpinner();
        Swal.fire({
          title: 'Error!',
          text: error.error.error,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }


}
