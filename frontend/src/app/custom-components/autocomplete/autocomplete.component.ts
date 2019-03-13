import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Event } from './../../models/event.model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Input() events: Event[] = [];
  @Input() loading = false;
  @Input() totalEvents = 0;

  @Output() searchChange = new EventEmitter<string>();
  @Output() scrollAtBottom = new EventEmitter();
  @Output() selected = new EventEmitter<Event>();

  constructor() { }

  ngOnInit() {
  }

  handleSearchChange(event) {
    this.searchChange.emit(event);
  }

  onScroll(event) {
    const scrollPosition = event.target.offsetHeight + event.target.scrollTop;

    if (scrollPosition >= event.target.scrollHeight) {
      this.scrollAtBottom.emit();
    }
  }

  eventSelected(event) {
    this.selected.emit(event);
  }
}
