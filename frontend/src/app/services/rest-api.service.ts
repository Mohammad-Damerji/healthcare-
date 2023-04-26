import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
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
  message: string,
  percentage?: number
} 

/*
IMPLEMENTATION
*/
@Injectable({
  providedIn: 'root'
})
export class RestAPIService {
  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('test_user1:12345678')
  })
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

  private getJson(getPath: string) {
    const options ={
      headers: this.jsonHeaders
    }
    return this.http.get<ApiResponse>(getPath, options)
  }

  public login(data: ApiLogin): Observable<RespLogin> {   
    return this.postJson(data, "auth/login/") as Observable<RespLogin>
  }

  public predictStroke(data: ApiPredict): Observable<RespPredict> {
    const jsonHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('test_user1:12345678')
    })
    /*const options = {
      headers: jsonHeaders,
      params: new HttpParams(data)
    }*/
    //return this.getJson("health/predict/stroke/?gender=Male") as Observable<RespPredict> 
    //return this.http.get<ApiResponse>(this.path + "health/predict/stroke/", options)
    return this.postJson(data, "health/predict/stroke/") as Observable<RespPredict>
  }
}
