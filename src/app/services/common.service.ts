import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableInput, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  handleError: (err: any, caught: Observable<any>) => ObservableInput<any>;
  loggedIn: boolean;
  constructor(private http: HttpClient) {

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

  /************************** Common API's call ********************************** */
  public request(
    method: string,
    url: string,
    options: { body?: any; headers?: any; observe?: any; reportProgress?: boolean }
  ): Observable<any> {
    return this.http.request(method, url, options).pipe(catchError(this.handleError));
  }


  login(data: any) {
    console.log('data' + data);
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.login}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json');
    return this.request('POST', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        this.loggedIn = true;
        return resp;
      }),
      catchError(error => {
        this.loggedIn = false;
        return of(false);
      })
    );
  }

  markAttendance(data:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.employeeAttendance}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.request('POST', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        alert(error);
        return of(false);
      })
    );
  }
 
  /****************************** ****************************************** */
  
  makeRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any,
    headers?: any
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(headers || {})
    });

    switch (method) {
      case 'GET':
        return this.http.get(url, { headers: httpHeaders }).pipe(
          catchError(err => {
            alert('Error: ' + JSON.stringify(err));
            return throwError(() => err);
          })
        );
      case 'POST':
        return this.http.post(url, data, { headers: httpHeaders }).pipe(
          catchError(err => {
            alert('Error: ' + JSON.stringify(err));
            return throwError(() => err);
          })
        );
      case 'PUT':
        return this.http.put(url, data, { headers: httpHeaders }).pipe(
          catchError(err => {
            alert('Error: ' + JSON.stringify(err));
            return throwError(() => err);
          })
        );
      case 'DELETE':
        return this.http.delete(url, { headers: httpHeaders }).pipe(
          catchError(err => {
            alert('Error: ' + JSON.stringify(err));
            return throwError(() => err);
          })
        );
      default:
        throw new Error('Invalid HTTP method');
    }
  }
}
