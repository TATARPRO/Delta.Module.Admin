import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpParams, HttpHandler, HttpRequest, HttpParameterCodec, HttpInterceptor, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from './core-interface';
import { CanLoad } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';

 /**
  * A httpClient wrapper for the inbuilt angular `HttpClient`
  * All requests made through this pipeline uses the base url of the hosting server as
  * the base url for all requests
  */
@Injectable()
export default class HttpContext {
  
  constructor(@Inject(HttpClient) private _httpClient: HttpClient) {
    
  }

  /**
   * Posts a resource to the requested url using the http post method configured with the default
   * headers.
   * @param url the url to post the data to
   * @param data the object to be posted to the server
   * @returns a json formatted object of type @template T from the request server.
  */
  public create<T>(url: string, data: any, initializer?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    if (initializer) {
      return this._httpClient.post<T>(BASE_URL() + url, data, initializer);
    } else {
      return this._httpClient.post<T>(BASE_URL() + url, data);
    }
  }

  /**
   * A wrapper around the httpPost method. Though this method sends a POST request, it is interpreted at the authorization
   * middleware as a GET request.
   *
   * Generally Get requests does not modify data on the server but POST and PUT does. The method is intended to be used a
   * search method because it allows the user construct dynamic search queries and parameters which can be handled by the server.
   *
   * When using this method, ensure that you do not include code which is intended to modify data on the server.
   * 
   * Posts a resource to the requested url using the http post method configured with the default headers.
   * @param url the url to post the data to
   * @param data the object to be posted to the server
   * @returns a json formatted object of type @template T from the request server.
  */
  public search<T>(url: string, data: any, initializer?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    if (initializer) {
      return this._httpClient.post<T>(BASE_URL() + url, data, initializer);
    } else {
      return this._httpClient.post<T>(BASE_URL() + url, data);
    }
  }

  /**
  * Reads data from the requested url. The url has to be formatted in a url parameters form.
  * For search methods, the server will pick the parameters from the route parameters.
  *
  * @example
  * ```typescript
  * 'users/?username=delta&email=deltauser@delta.com&phoneNumber=08123456789'
  * ```
  * will become
  * ```typescript
  * localhost:9700/users/?username=delta&email=deltaUser@delta.com&phoneNumber=08123456789
  * ```
  * @param url the url to post the data to
  * @param data the object to be posted to the server
  * @returns a json formatted object of type @template T from the request server.
  */
  public read<T>(url: string, initializer?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    if (initializer) {
      return this._httpClient.get<T>(BASE_URL() + url, initializer);
    } else {
      return this._httpClient.get<T>(BASE_URL() + url);
    }
  }

  /**
  * Makes an update request to the requesting server using the @see HttpClient.Update method
  * @param url the url to post the data to
  * @param data the object to be posted to the server
  * @returns a json formatted object of type @template T from the request server.
  */
  public update<T>(url: string, data: any, initializer?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    if (initializer) {
      return this._httpClient.put<T>(BASE_URL() + url, data, initializer)
    } else {
      return this._httpClient.put<T>(BASE_URL() + url, data)
    }
  }

  /**
  * Sends a delete request to the requesting server 
  * @param url the url to post the data to
  * @returns a json formatted object of type @template T from the request server.
  */
  public delete<T>(url: string, initializer?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    if (initializer) {
      return this._httpClient.delete<T>(BASE_URL() + url, initializer);
    } else {
      return this._httpClient.delete<T>(BASE_URL() + url);
    }
  }

  public raw<T>(method: 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE' | 'GET' | 'JSONP' | 'OPTIONS', url: string, body?: any, initializer?: Object): Observable<HttpEvent<T>> {
    let req = new HttpRequest(method, BASE_URL() + url, body, initializer)
    return this._httpClient.request<T>(req)
  }
}

export class ApiInterceptor implements HttpInterceptor {

  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      window.location.replace(`/authentication/login/?returnUrl=${window.location.pathname}`);
      return of(err.message); 
    }

    if (err.status === 403) {
      window.location.replace(`/authentication/access-denied/?returnUrl=${window.location.pathname}`);
      return of(err.message);
    }

    if (err && err.error instanceof Object) {
      return throwError(err);
    } else {
      return throwError({ error: { message: [`An error occcured while performing the last operation`] } });
    }
  }

  private getCookieValue(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.getCookieValue("delta-admin")
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next.handle(req).pipe(catchError(x => this.handleError(x)));
  }
}

export class ProtectedRoute implements CanLoad {

    canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        throw new Error("Method not implemented.");
    }

}
