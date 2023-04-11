import { Component } from '@angular/core';
import { AuthService } from './services/auth-service';
import { IncrementService } from './services/increment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private increment: IncrementService,
  ) {
  }

  onClick() {
    this.auth.logout();
    this.increment.removeCounterValue();
  }
}
