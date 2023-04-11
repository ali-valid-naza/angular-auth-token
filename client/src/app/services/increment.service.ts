import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SESSION_STORAGE } from '../login/storage';

@Injectable({
  providedIn: 'root'
})
export class IncrementService {
  currentValue: Subject<number> = new Subject();

  constructor(
    @Inject(SESSION_STORAGE) private storage: Storage,
  ) {
  }

  public getCounterValue(): string {
    return <string>this.storage.getItem('counter-value');
  }

  public setCounterValue(value: string) {
    this.storage.setItem('counter-value', value);
  }

  public removeCounterValue() {
    this.storage.removeItem('counter-value');
  }
}
