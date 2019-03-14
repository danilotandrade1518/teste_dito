import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EventResponse } from './../models/event-response.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private url = environment.api_url + '/events?limit=100';

  constructor(private http: HttpClient) { }

  getEvents(search: string, page: number): Observable<EventResponse> {
    return this.http.get<EventResponse>(this.url + `&page=${page}&search=${search}`);
  }
}
