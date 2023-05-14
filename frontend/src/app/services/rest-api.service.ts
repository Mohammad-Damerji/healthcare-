import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';

/*
INTERFACES
*/
export type ApiFun = (_: ApiInput) => Observable<ApiResponse>
export type ApiInput = ApiLogin | ApiPredict | ApiImage | ApiSignup
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

type Base64Image = string
export interface ApiImage {
  image: Base64Image
}

export interface ApiSignup {
    email: string,
    username: string,
    password: string,
    phone_number: string,
    gender: "male" | "female",
    birth_date: string,
    first_name: string,
    last_name: string,
}

export type ApiResponse = RespLogin | RespPredict | RespImage
export interface RespLogin {
  success: boolean
  message: string
}

export interface RespPredict {
  success: boolean,
  message: string,
  percentage?: number
} 

export interface RespImage {
  success: boolean,
  message: string,
  data: string
}

export interface RespSignup {
  success: boolean,
  message?: string
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
    console.log(data);
     
    return this.postJson(data, "auth/login/") as Observable<RespLogin>
  }

  public signup(data: ApiSignup): Observable<any> {    
    return this.postJson(data, "auth/signup/") as Observable<RespSignup>
  }

  public predictStroke(data: ApiPredict): Observable<RespPredict> {
    return this.postJson(data, "health/predict/stroke/") as Observable<RespPredict>
  }

  public predictHeartDisease(data: ApiPredict): Observable<RespPredict> {
    return this.postJson(data, "health/predict/heart-disease/") as Observable<RespPredict>
  }

  public predictImage(base64: Base64Image): Observable<RespImage> {
    const data = {
      image: base64
    } as ApiImage
    return this.postJson(data, "health/predict/xray/") as Observable<RespImage>
  }
}
