import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EventsComponent } from './events.component';
import { AutocompleteModule } from './../custom-components/autocomplete/autocomplete.module';
import { EventsService } from './events.service';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AutocompleteModule,
  ],
  providers: [EventsService],
  exports: [EventsComponent]
})
export class EventsModule { }
