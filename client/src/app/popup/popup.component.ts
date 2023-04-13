import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { IncrementService } from '../services/increment.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  constructor(private increment: IncrementService,) {
  }

  @Input()
  get currentValue(): number {
    return this._currentValue;
  }

  set currentValue(currentValue: number) {
    this._currentValue = currentValue;
  }

  @Input()
  get nextValue(): number {
    return this._nextValue;
  }

  set nextValue(nextValue: number) {
    this._nextValue = nextValue;
  }

  private _currentValue = 0;
  private _nextValue = 0;

  @Output() closed = new EventEmitter<void>();

  confirm() {
    this.increment.currentValue.next(this.nextValue);
    this.closed.next();
    this.increment.setCounterValue(this.nextValue.toString());
  }

  cancel() {
    this.increment.currentValue.next(this.currentValue);
    this.closed.next();
  }
}
