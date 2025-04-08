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
