import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private showDialogSource = new Subject<boolean>();
  showDialog$ = this.showDialogSource.asObservable();

  showDialog() {
    console.log('showDialog');
    this.showDialogSource.next(true);
  }
}
