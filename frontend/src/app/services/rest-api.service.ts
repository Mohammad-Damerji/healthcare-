import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

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
  private jsonHeaders: HttpHeaders
  private path = "http://localhost:8000/auth/"

  constructor(private http: HttpClient) {
    this.jsonHeaders = new HttpHeaders()
    this.jsonHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  private postJson(data: ApiInput, request: string): Observable<ApiResponse> {
    return this.http.post(this.path + request,
      JSON.stringify(data),
      {
        headers: this.jsonHeaders
      }
    ) as Observable<ApiResponse>
  }

  public login(data: ApiLogin): Observable<RespLogin> {   
    return this.postJson(data, "login/") as Observable<RespLogin>
  }

  public predict(data: ApiPredict): Observable<RespPredict> {
    return this.postJson(data, "predict/") as Observable<RespPredict> 
  }
}
