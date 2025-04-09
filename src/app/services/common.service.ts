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
  
    if (this.isMobile()) {
      // ✅ Native headers must be plain object
      const nativeHeaders = {
        'Content-Type': 'application/json'
      };
      console.log('📡 [Native] URL:', url);
      console.log('📦 [Native] Data:', data);
      console.log('🧾 [Native] Headers:', nativeHeaders);
      return from(this.httpNative.post(url, data, nativeHeaders)).pipe(
        catchError(error => {
          alert('❌ Native Error: ' + JSON.stringify(error));
          return throwError(() => error);
        })
      );
    } else {
      const webHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      return this.http.post(url, data, { headers: webHeaders }).pipe(
        catchError(error => {
          alert('❌ Web Error: ' + JSON.stringify(error));
          return throwError(() => error);
        })
      );
    }
  }
}
