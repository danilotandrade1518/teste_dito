import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, tap, switchMap, retryWhen } from 'rxjs/operators';
import { EventsService } from './../events/events.service';
import { EventResponse } from './../models/event-response.model';
import { Event } from './../models/event.model';
import { EventResponseBuilder } from './../models/event-response.builder';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  currentPage = 1;
  currentSearch = '';
  eventResponse: EventResponse;
  events: Event[] = [];
  loading = false;
  // autoCompleteLoading = false;
  hasError = false;
  selectedEvent;

  private searchString: Subject<string> = new Subject<string>();

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.getEvents();
  }

  handleSearchChange(event) {
    const keyCode = event.which;
    const alphaNumericKeyCodes = Array.from(Array.from(Array(Math.ceil((91 - 48) / 1)).keys()), x => 48 + x * 1);
    const validKeys = [8, 46, ...alphaNumericKeyCodes];

    if ( validKeys.includes(keyCode) ) {
      const value = event.target.value;

      this.resetResponse();

      if (value && value.length >= 2) {
        this.loading = true;
        this.searchString.next(event.target.value);
      }
    }
  }

  getEvents() {
    const getEventsFromApi = search => this.eventsService.getEvents(search, this.currentPage);

    this.searchString.pipe(
      debounceTime(800),
      tap(search => this.currentSearch = search),
      switchMap(getEventsFromApi),
      retryWhen(errors =>
        errors.pipe(
          tap(val => {
            this.hasError = true;
            this.resetResponse();
          }),
        )
      ),
      tap(res => {
        this.hasError = false;
        this.eventResponse = res;
        this.events = this.eventResponse.events;
        this.loading = false;
      }),
    ).subscribe();
  }

  onScrollAtBottom() {
    console.log('SCROLL!');
    this.loading = true;

    this.eventsService.getEvents(this.currentSearch, this.currentPage + 1).pipe(
      tap(eventResponse => {
        if (eventResponse.pagination.currentEvents > 0) {
          this.currentPage++;
          this.eventResponse = eventResponse;
          this.events = this.events.concat(this.eventResponse.events);
        }

        this.loading = false;
      })
    ).subscribe();
  }

  onEventSelected(event) {
    this.selectedEvent = event;
  }

  private resetResponse() {
    this.eventResponse = EventResponseBuilder.build();
    this.events = [];
    this.currentPage = 1;
    this.currentSearch = '';
  }
}
