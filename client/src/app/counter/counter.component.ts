import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ApiDataService } from '../services/api-data.service';
import { CounterResponse } from '../types';
import { ShownCustomElementService } from '../services/shown-custom-element.service';
import { PopupComponent } from '../popup/popup.component';
import { createCustomElement } from '@angular/elements';
import { IncrementService } from '../services/increment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CounterComponent implements OnInit, DoCheck, OnDestroy {
  counterValue: number = 0;
  sub: Subscription;

  constructor(
    private apiDataService: ApiDataService,
    public popup: ShownCustomElementService,
    protected injector: Injector,
    private increment: IncrementService,
    private cdr: ChangeDetectorRef,
  ) {
    const PopupElement = createCustomElement(PopupComponent, {injector});
    customElements.define('popup-element', PopupElement);
  }

  doIncrement() {
    this.apiDataService.doIncrement({counterValue: this.counterValue})
      .then((response: CounterResponse) => {
        this.popup.showAsElementPopup(this.counterValue, response.nextValue);
      });
  }

  ngDoCheck(): void {
    this.sub = this.increment.currentValue.subscribe(v => {
      this.counterValue = v;
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    if (this.increment.getCounterValue()) {
      this.counterValue = Number(this.increment.getCounterValue());
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.increment.removeCounterValue();
  }
}
