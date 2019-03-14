import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, tap, switchMap, retryWhen, filter } from 'rxjs/operators';
import { EventsService } from './../events/events.service';
import { EventResponse } from './../models/event-response.model';
import { Event } from './../models/event.model';
import { EventResponseBuilder } from './../models/event-response.builder';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  currentPage = 1;
  currentSearch = '';
  eventResponse: EventResponse = EventResponseBuilder.build();
  events: Event[] = [];
  loading = false;
  hasError = false;
  selectedEvent: Event = new Event('', '');

  searchStringSubscription: Subscription;
  getEventsSubscription: Subscription;

  private searchString: Subject<string> = new Subject<string>();

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.getEvents();
  }

  ngOnDestroy() {
    this.searchStringSubscription.unsubscribe();
    this.getEventsSubscription.unsubscribe();
  }

  handleSearchChange(event) {
    const keyCode = event.which;
    const alphaNumericKeyCodes = Array.from(Array.from(Array(Math.ceil((91 - 48) / 1)).keys()), x => 48 + x * 1);
    const validKeys = [8, 46, ...alphaNumericKeyCodes];

    if ( validKeys.includes(keyCode) ) {
      this.resetResponse();

      this.searchString.next(event.target.value);
    }
  }

  getEvents() {
    const getEventsFromApi = search => this.eventsService.getEvents(search, this.currentPage);
    const checkInitLoading = search => this.loading = (search.length >= 2);
    const checkStopLoadingAndFilter = search => {
      this.loading = search.length >= 2;
      return search && search.length >= 2;
    };
    const handleErrors = errors => errors.pipe(
      tap(val => {
        this.hasError = true;
        this.resetResponse();
      }),
    );
    const handleSuccess = eventResponse => {
      this.hasError = false;
      this.eventResponse = eventResponse;
      this.events = this.eventResponse.events;
      this.loading = false;
    };

    this.searchStringSubscription = this.searchString.pipe(
      tap(checkInitLoading),
      debounceTime(800),
      filter(checkStopLoadingAndFilter),
      tap(search => this.currentSearch = search),
      switchMap(getEventsFromApi),
      retryWhen(handleErrors),
      tap(handleSuccess),
    ).subscribe();
  }

  onScrollAtBottom() {
    this.loading = true;

    this.getEventsSubscription = this.eventsService.getEvents(this.currentSearch, this.currentPage + 1).pipe(
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
