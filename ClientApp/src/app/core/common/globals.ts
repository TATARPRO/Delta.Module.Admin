import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";

@Injectable()
export class Environment {
  asynchronousObserver: Observable<boolean>
  private isAsynchronous: boolean
  private asynchronous: Observer<any>

  constructor() {
    this.asynchronousObserver = Observable.create((observer: Observer<any>) => {
      this.asynchronous = observer;
    });
  }

  set inAsyncMode(val: boolean) {
    this.isAsynchronous = val;
    this.asynchronous.next(this.isAsynchronous);
  }
}
