import { Event } from './event.model';

export class Pagination {
  constructor(
    public currentEvents: number,
    public totalEvents: number,
  ) {}
}

export class EventResponse {
  constructor(
    public pagination: Pagination,
    public events: Event[],
  ) {}
}
