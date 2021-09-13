import { Injectable } from "@angular/core";
import HttpContext from "./httpContext";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

/**
 * A class which provides a description for a translation*/
class Translation {
  /**
   * The value to be translated. Default culture is en-US
   */
  public Key: string;

  /**
   * The translated string in the client's request culture
   */
  public Value: string;
}

@Injectable()
export default class ArialTranslate {
  private translations: Translation[] = new Array<Translation>();

  private translateRoute: string = "/localization/read";

  constructor(httpContext: HttpContext) {
    var localTranslations: any;
    httpContext.read(this.translateRoute)
      .pipe(catchError((error: Response) =>
        throwError(`Network Error: ${error.statusText} (${error.status})`)))
      .subscribe((succeed) => {
        localTranslations = succeed
        //localTranslations.forEach((value) => {
          //this.translations.push({ Key: value.Key, Value: value.value })
        //})
      }, (fail) => {
        //show toaster with error
      });
  }

  public translate(key: string) {
    return key;
    //return this.translations[key].Value;
  }
}
