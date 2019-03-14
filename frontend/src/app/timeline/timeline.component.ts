import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { TimelineService } from './timeline.service';
import { Timeline } from '../models/timeline.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  timeline: Timeline;
  timelineSubscription: Subscription;
  loading = true;

  constructor(private timelineService: TimelineService) { }

  ngOnInit() {
    this.timelineSubscription = this.timelineService.getTimeline().subscribe(
      timeline => {
        this.timeline = timeline;
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.timelineSubscription.unsubscribe();
  }
}
