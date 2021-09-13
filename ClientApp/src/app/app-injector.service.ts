import { Injector } from '@angular/core'
import { ReplaySubject } from 'rxjs';

export class AppInjector {
  private static injector: Injector = undefined;
  private static subject = new ReplaySubject<Injector>();

  static setInjector(injector: Injector) {
    AppInjector.injector = injector;
    AppInjector.subject.next(AppInjector.injector)
  }

  static getInjector(): ReplaySubject<Injector> {
    return AppInjector.subject;
  }
}


