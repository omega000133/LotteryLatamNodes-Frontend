import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { History } from 'src/app/models/ticket/history.entity';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  histories: History[] = [];
  address: string = '';
  totalReward: number = 0;
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.address = params['address'];
      if (this.address) {
        this.loadHistories(this.address);
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

  loadHistories(address: string, page: number = 1): void {
    this.currentPage = page;
    this.ticketService.getHistoryByAddress(address, page).subscribe({
      next: (response) => {
        this.histories = response.winners;
        this.histories = this.histories.map((history) => {
          history.jackpot.draw_date = this.timeAgo(history.jackpot.draw_date);
          return history;
        })
        this.totalPages = response.total_pages;
        this.pages = this.getPages(page, response.total_pages);
        this.totalReward = this.getTotalRewards(this.histories);
      },
      error: (error) => console.error('Error fetching tickets:', error),
    });
  }

  private getTotalRewards(histories: History[]): number {
    const reward = histories.reduce((accumulator, history) => {
      return accumulator + history.jackpot.reward * history.jackpot.winning_percentage / 100
    }, 0)

    return parseFloat(reward.toFixed(1));
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

  private timeAgo(date: string) {
    const now = new Date().getTime();
    const historyDate = new Date(date).getTime();
    const differenceInMs = now - historyDate;

    const seconds = Math.floor(differenceInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years >= 1) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months >= 1) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days >= 1) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours >= 1) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes >= 1) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    }
  }
}
