import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from '../config/app.config';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { 

  }

  getLogin(data: { username: string; password: string }): Observable<any> {
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.login}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, data, { headers }).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }
}
