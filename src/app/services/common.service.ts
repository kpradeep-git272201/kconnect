import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from '../config/app.config';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient, private httpNative: HTTP) {
    this.httpNative.setDataSerializer('json');
  }

  /********************  */
    getDataFromIP(): Observable<any> {
      return this.http.get('http://147.79.66.224/madminapi/publicApi/v1/auth/test', { 
        responseType: 'text' as 'json'
      });
    }

    getDataFromEgram(): Observable<any> {
     
      return this.http.get('https://egramswaraj.gov.in/egs-api-demo/api/v1/auth/test', {
         responseType: 'text' as 'json'
      });
    }

    getDataFromHttpbin(): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.get('http://httpbin.org/get', { headers });
    }

  /***  ************************ */
  isMobile(): boolean {
    return !!window && !!(window as any).Capacitor;
  }

  getLogin(data: { username: string; password: string }): Observable<any> {
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.login}`;
  
    const webHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, data, { headers: webHeaders }).pipe(
      catchError(error => {
        alert('Web Error: ' + JSON.stringify(error));
        return throwError(() => error);
      })
    );
  }
}
