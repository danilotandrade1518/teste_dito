import { EventResponse, Pagination } from './event-response.model';

export class EventResponseBuilder {
  static build(): EventResponse {
    return new EventResponse(new Pagination(0, 0), []);
  }
}
