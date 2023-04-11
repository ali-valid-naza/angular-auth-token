import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { PopupComponent } from '../popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class ShownCustomElementService {

  showAsElementPopup(currentValue: number, nextValue: number | undefined) {
    const popupEl: NgElement & WithProperties<PopupComponent> = document.createElement('popup-element') as any;
    popupEl.addEventListener('closed', () => {
      document.body.removeChild(popupEl);
    });
    popupEl.currentValue = currentValue;
    if (nextValue != null) {
      popupEl.nextValue = nextValue;
    }
    document.body.appendChild(popupEl);
  }
}
