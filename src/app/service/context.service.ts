import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  // public onSideBarClick$ : Subject<string> = new Subject<string>
  onSideBarClick$ = new Subject<{ role: string; pageTitle: string }>();

  // onDealerClick$ = new Subject<{ name: string ; titleValue: string }>();

  // private breadcrumbSubject = new BehaviorSubject<{
  //   name: string;
  //   path: string;
  // } | null>(null);
  // breadcrumb$ = this.breadcrumbSubject.asObservable();

  // updateBreadcrumb(name: string, path: string) {
  //   this.breadcrumbSubject.next({ name, path });
  // }

  private breadcrumbSubject = new BehaviorSubject<{
    name: string;
    path: string;
  } | null>(null);
  breadcrumb$ = this.breadcrumbSubject.asObservable();

  updateBreadcrumb(name: string, path: string) {
    this.breadcrumbSubject.next({ name, path });
  }
}
