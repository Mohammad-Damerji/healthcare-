import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';

/*
INTERFACES
*/
export type ApiFun = (_: ApiInput) => Observable<ApiResponse>
export type ApiInput = ApiLogin | ApiPredict
export interface ApiLogin {
  username: string,
  password: string
}

export interface ApiPredict {
    gender: "Male" | "Female" | "Other",
    age: number,
    hypertension: boolean,
    heart_disease: boolean,
    Residence_type: "Urban" | "Rural",
    avg_glucose_level: number,
    bmi: number,
    smoking_status: "formerly smoked" | "never smoked" | "smokes" | "Unknown"
}

export type ApiResponse = RespLogin | RespPredict
export interface RespLogin {
  success: boolean
  message: string
}

export interface RespPredict {
  success: boolean,
  percentage: number
} 

/*
IMPLEMENTATION
*/
@Injectable({
  providedIn: 'root'
})
export class RestAPIService {
  private jsonHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  private path = "http://localhost:8000/api/"

  constructor(private http: HttpClient) { }

  private handleError<T>(error: HttpErrorResponse) {
    return new Observable<T>((subscriber) => {
      subscriber.next(error.error)
      subscriber.complete()
    })
  }

  private postJson(data: ApiInput, request: string): Observable<ApiResponse> {
    const postPath = this.path + request
    const body = JSON.stringify(data);
    const options ={
      headers: this.jsonHeaders
    }

    return this.http.post<ApiResponse>(postPath, body, options).pipe(catchError(this.handleError<ApiResponse>))  
  }

  public login(data: ApiLogin): Observable<RespLogin> {   
    return this.postJson(data, "auth/login/") as Observable<RespLogin>
  }

  public predict(data: ApiPredict): Observable<RespPredict> {
    return this.postJson(data, "predict/") as Observable<RespPredict> 
  }
}
