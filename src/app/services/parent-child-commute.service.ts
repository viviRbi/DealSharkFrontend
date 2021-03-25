import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IGameInfo } from '../models/gameModel';

@Injectable({
  providedIn: 'root'
})

export class ParentChildCommuteService {

  // Subject is both an Observable(subcribe) and Observer (next, error, complete method)
  private emitChangeSaveGameSource = new Subject<any>();
  private emitChangeCartGameSource = new Subject<any>();

  // Observable string streams. Our parent component will use this to subcribe
  changeSaveEmitted$ = this.emitChangeSaveGameSource.asObservable();
  changeCartEmitted$ = this.emitChangeCartGameSource.asObservable();

  // After next(value) , able to use subcribe as an observale
  emitSaveChange(change: any) {
    this.emitChangeSaveGameSource.next(change);
  }
  emitCartChange(change: any) {
    this.emitChangeCartGameSource.next(change);
  }
  
}
