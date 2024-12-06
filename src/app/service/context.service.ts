import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
  
@Injectable({
  providedIn: 'root',
})
export class ContextService {
  // public onSideBarClick$ : Subject<string> = new Subject<string>
  onSideBarClick$ = new Subject<{ role: string; pageTitle: string }>();

  onDealerClick$ = new Subject<{ breadCrum: string }>();
}



