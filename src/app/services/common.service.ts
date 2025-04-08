import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from '../config/app.config';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { 

  }




  private isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
  async getLogin(data: { username: string; password: string }) {
    const url = `${AppConfig.BASE_API}${AppConfig.ENDPOINTS.login}`;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'observe': 'response',
      'responseType': 'json'
    });
    const doPost = async () => {
      const options = {
        url: url,
        headers: { 'X-Fake-Header': 'Thomas was here' },
        data: data,
      };
      const response = await Http.post(options);
      console.log(response)
    };
    return doPost;
    // if(this.isMobile()){
    //   return this.nativePost(url, data, headers);
    // }else{
    //   return this.http.post(url, data, { headers }).pipe(
    //     catchError(error => {
    //       alert(JSON.stringify(error));
    //       return throwError(() => error);
    //     })
    //   );
    // }
   
  }

  private nativePost(url: string, data: any, headers: any): Observable<any> {
    const options = { url, data, headers };
    return new Observable(observer => {
      Http.post(options).then(response => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
  
}
