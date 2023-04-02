import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

interface UserLogin {
  username: string,
  password: string
}


@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  constructor(private http: HttpClient) { }

  public login(data: UserLogin): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    

    return this.http.post(
      "http://localhost:8000/auth/login/",
      JSON.stringify(data),
      {
        headers: headers
      }
    )
    
  }
}
