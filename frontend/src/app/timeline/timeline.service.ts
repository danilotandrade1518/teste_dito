import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Timeline } from '../models/timeline.model';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private url = environment.api_url + '/timeline';

  constructor(private http: HttpClient) { }

  getTimeline(): Observable<Timeline> {
    return this.http.get<Timeline>(this.url);
  }
}
