import { Injectable } from '@angular/core';
import { ServiceGenerator } from '../base/service-generator';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Winner } from 'src/app/models/ticket/winner.entity';
import { Summary } from 'src/app/models/ticket/summary.entity';
import { Statistics } from 'src/app/models/ticket/statistics';
import { Ticket } from 'src/app/models/ticket/ticket.entity';
import { History } from 'src/app/models/ticket/history.entity';

@Injectable({
  providedIn: 'root',
})
export class TicketService extends ServiceGenerator {
  constructor(private httpClient: HttpClient) {
    super();
  }

  getTopWinners(): Observable<Winner[]> {
    return this.httpClient
      .get<any>(this.buildurl('ticket/top-winners/'))
      .pipe(map((response) => response.results));
  }

  checkUpdateAddress(address: string): Observable<any> {
    return this.httpClient.post<any>(
      this.buildurl('ticket/check-update-address/'),
      {
        address,
      }
    );
  }

  getAddressSummary(address: string): Observable<Summary> {
    let params = new HttpParams().set('address', address);
    return this.httpClient.get<any>(this.buildurl('ticket/summary/'), {
      params,
    });
  }

  getJackpotCountdown(): Observable<any> {
    return this.httpClient
      .get<{ countdown: string }>(this.buildurl('ticket/countdown/'))
      .pipe(map((response) => response.countdown));
  }

  getParticipantStatistics(address: string): Observable<Statistics> {
    let params = new HttpParams().set('address', address);
    return this.httpClient.get<any>(
      this.buildurl('ticket/participant-statistics/'),
      { params }
    );
  }

  getTicketsByAddress(
    address: string,
    page: number = 1,
    pageSize: number = 10
  ): Observable<any> {
    let params = new HttpParams()
      .set('address', address)
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.httpClient.get<{
      tickets: string[];
      count: number;
      next: string;
      previous: string;
    }>(this.buildurl('ticket/tickets-by-address/'), { params });
  }

  getHistoryByAddress(
    address: string,
    page: number = 1,
    pageSize: number = 10
  ): Observable<any> {
    let params = new HttpParams()
      .set('address', address)
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.httpClient.get<{
      winners: History[];
      count: number;
      next: string;
      previous: string;
    }>(this.buildurl('ticket/winners-by-address/'), { params });
  }

  checkAddress(address: string): Observable<any> {
    let params = new HttpParams().set('address', address);
    return this.httpClient.get<any>(this.buildurl('ticket/check-address/'), {
      params,
    });
  }
}
