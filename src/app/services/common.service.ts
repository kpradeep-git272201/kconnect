import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableInput, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from '../config/app.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  handleError: (err: any, caught: Observable<any>) => ObservableInput<any>;
  loggedIn: boolean;
  constructor(private http: HttpClient,
    private router: Router
  ) {

  }


  getLoggedUser(){
    const loggedUser:any = localStorage.getItem('loggedUser');
    const token = localStorage.getItem('token');
    if (token)
      return (loggedUser)? JSON.parse(loggedUser): loggedUser;
    else return;
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
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('POST', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        // alert(error);
        return of(error);
      })
    );
  }
 
  getAttendanceLogs(){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.employeeAttendance}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        // alert(error);
        return of(error);
      })
    );
  }

  getTotalEmp(branchId){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.totalEmployee}${branchId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        // alert(error);
        return of(error);
      })
    );
  }

  getEmployeeList(data:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.totalEmployeeList}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('POST', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  getStudentList(classId:any, sectionId:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.studentList}/${classId}/${sectionId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  getSeeClasswork(monthId:any, subjectId:any, classId:any, sectionId:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.getSeeClasswork}/${monthId}/${subjectId}/${classId}/${sectionId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  getSeeHomework(monthId:any, subjectId:any, classId:any, sectionId:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.getSeeHomework}/${monthId}/${subjectId}/${classId}/${sectionId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  getRecentHomeWork(subjectId:any, classId:any, sectionId:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.getRecentHomeWork}/${subjectId}/${classId}/${sectionId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  getRecentClassWork(subjectId:any, classId:any, sectionId:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.getRecentClassWork}/${subjectId}/${classId}/${sectionId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  updateStuAttendance(data:any, classId:any, sectionId:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.studentList}/${classId}/${sectionId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('PATCH', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  geotaggedLocation(data:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.geotaggedLocation}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('POST', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  uploadHomeWork(data:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.uploadHomework}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('POST', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  updateHomeWork(data:any, homeWorkId:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.uploadHomework}/${homeWorkId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('PATCH', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  uploadClassWork(data:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.uploadClassWork}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('POST', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  updateClassWork(data:any, classWorkId:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.uploadClassWork}/${classWorkId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('PATCH', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  getBranchLatLong(){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.getGeotaggedLocation}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  getFaculityWiseClass(){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.faculityWiseClass}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  getSubjectByClassId(classId:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.getSubjectByClassId}/${classId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  addStuAttendance(data:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.studentAttendance}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('POST', url, { body: data, headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  getClassList(){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.classList}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  getPresentEmployee(branchId:any){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.presentEmployee}${branchId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  getMyAttendance(){
    const token = localStorage.getItem('token');
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.myAttendance}`;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.request('GET', url, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      map(resp => {
        return resp;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
  
  getLogout(){
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
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
