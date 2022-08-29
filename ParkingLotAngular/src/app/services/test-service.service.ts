//TOBEDELETED

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  private baseUrl = 'https://localhost:7135/api/CarTypes/';

  constructor(private http : HttpClient) { }

  public testAPI() : Observable<any>{
    console.log("Am intrat in api!");
    let response = this.http.get(this.baseUrl).subscribe(data =>{
      console.log(data);
    });
    return this.http.get(this.baseUrl);
  }
}
