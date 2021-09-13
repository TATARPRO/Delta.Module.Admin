import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";


declare function appendCheckboxHelper();
declare function setBackground();
declare function tooltip();
declare function fileUpload();

@Injectable()
export class ApplicationState {
  private connEvents: Subject<boolean>;

  constructor() {
    this.connEvents = new Subject<boolean>();
    window.addEventListener("online", (e) => this.handleConnectionChange(e));
    window.addEventListener("offline", (e) => this.handleConnectionChange(e));
  }

  private handleConnectionChange(event) {
    this.connEvents.next(this.connected);
  }

  get connected(): boolean {
    return window.navigator.onLine;
  }

  get onlineStatus(): Observable<boolean> {
    return this.connEvents;
  }
}

@Injectable()
export class DynamicControlBinder {

  public handleBindings() {
    appendCheckboxHelper()
    setBackground()
    tooltip()
    fileUpload()
  }
}
