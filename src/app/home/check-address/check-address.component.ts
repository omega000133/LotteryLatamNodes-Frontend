import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Router } from '@angular/router'; // Import Router
import Swal from 'sweetalert2';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-check-address',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './check-address.component.html',
  styleUrls: ['./check-address.component.scss'],
})
export class CheckAddressComponent {
  faPaperPlane = faPaperPlane;
  address: string = '';

  constructor(private ticketService: TicketService, private router: Router, private spinnerService: SpinnerService) { } // Inject the router

  checkAddress() {
    this.spinnerService.showSpinner();
    this.ticketService.checkUpdateAddress(this.address).subscribe({
      next: (response) => {
        this.router.navigate(['/participant'], {
          queryParams: { address: this.address },
        });
      },
      error: (error) => {
        this.spinnerService.hideSpinner();
        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  onSubmit() {
    this.checkAddress();
  }
}
