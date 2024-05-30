import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  standalone: true,
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdown: string = '';
  private countdownSubscription: Subscription = new Subscription;
  private initialTime: number = 0;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.getJackpotCountdown().subscribe({
      next: (countdown) => {
        this.initialTime = this.parseCountdown(countdown);
        this.startDynamicCountdown();
      },
      error: () => {
        this.countdown = 'EXPIRED';
      },
    });
  }

  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  private startDynamicCountdown() {
    this.countdownSubscription = interval(1000)
      .pipe(
        startWith(0),
        map((elapsed) => this.calculateCountdown(this.initialTime - elapsed)),
        takeWhile((time) => time.totalSeconds >= 0)
      )
      .subscribe({
        next: (time) => {
          if (time.totalSeconds >= 0) {
            this.countdown = `${time.days}D : ${time.hours}H : ${time.minutes}M : ${time.seconds}S`;
          } else {
            this.countdown = 'EXPIRED';
          }
        },
      });
  }

  private parseCountdown(countdown: string): number {
    // Assuming countdown is a string like "5D : 04H : 03M : 02S"
    const regex = /(\d+)D : (\d+)H : (\d+)M : (\d+)S/;
    const parts = countdown.match(regex);
    return (
      +parts![1] * 86400 + +parts![2] * 3600 + +parts![3] * 60 + +parts![4]
    );
  }

  private calculateCountdown(seconds: number) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return {
      totalSeconds: seconds,
      days,
      hours,
      minutes,
      seconds: secondsLeft,
    };
  }
}
