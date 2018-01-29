import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Injectable()
export class LoaderService {

  private _pendingRequestsStatus: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor() { }

  get pendingRequestsStatus(): Observable<boolean> {
    return this._pendingRequestsStatus.asObservable();
  }

  hide(): void{
    this._pendingRequestsStatus.next(false);
  }

  show(): void{
    this._pendingRequestsStatus.next(true);
  }

}
