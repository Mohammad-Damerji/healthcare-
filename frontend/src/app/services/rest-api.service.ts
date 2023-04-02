import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

/*
INTERFACES
*/
export type ApiFun = (_: ApiInput) => Observable<ApiResponse>
export type ApiInput = ApiLogin
export interface ApiLogin {
  username: string,
  password: string
}

export type ApiResponse = RespLogin
export interface RespLogin {
  success: boolean
  message: string
}


/*
IMPLEMENTATION
*/
@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  constructor(private http: HttpClient) { }

  public login(data: ApiLogin): Observable<RespLogin> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    

    return this.http.post(
      "http://localhost:8000/auth/login/",
      JSON.stringify(data),
      {
        headers: headers
      }
    ) as Observable<RespLogin>
    
  }
}
