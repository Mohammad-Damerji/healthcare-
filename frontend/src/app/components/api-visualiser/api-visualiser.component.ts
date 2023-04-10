import { Component } from '@angular/core';
import { ApiFun, ApiInput, RestAPIService } from 'src/app/services/rest-api.service';

interface APITest {
  name: string,
  input: any,
  result: any
}

@Component({
  selector: 'app-api-visualiser',
  templateUrl: './api-visualiser.component.html',
  styleUrls: ['./api-visualiser.component.css']
})
export class ApiVisualiserComponent {
  tests: APITest[] = []

  constructor(private rest: RestAPIService) {
    const firstI = { username: "random", password: "wierd" }
    this.rest.login(firstI).subscribe(e => {
      console.log(e);
      
      let first: APITest = {
        name: "Bad login",
        input: firstI,
        result: this.stringify(e)
      }
      this.tests.push(first)
    })
   
  }

  stringify(param: any) {
    return JSON.stringify(param)
  }

  testCase(name: string, fun: ApiFun, input: ApiInput) {
    fun(input).subscribe(e => {     
      let first: APITest = {
        name: name,
        input: input,
        result: this.stringify(e)
      }
      this.tests.push(first)
    })
  }
}

