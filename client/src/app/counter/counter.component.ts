import { Component } from '@angular/core';
import { ApiDataService } from '../services/api-data.service';
import { CounterResponse } from '../types';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  counterValue: number = 0;

  constructor(private incrementService: ApiDataService) {
  }

  doIncrement() {
    console.log(this.counterValue);
    this.incrementService.doIncrement({counterValue: this.counterValue})
      .then((response: CounterResponse) => {
        console.log(response.counterValue);
        this.counterValue = response.counterValue;
      });
  }
}
