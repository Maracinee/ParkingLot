import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarPost, Cars } from 'src/app/models/cars/cars';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private baseUrl = 'https://localhost:7135/api/Cars/';

  constructor(private http : HttpClient) { }

  public getCars() : Observable<Cars[]>{
    return this.http.get<Cars[]>(this.baseUrl);
  }

  public createCar(car : CarPost){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(car);
    return this.http.post(this.baseUrl, body,{'headers':headers});
  }

  public deleteCar(id : number){
    if(id == 0){
      return null;
    }else{
      return this.http.delete<Cars>(this.baseUrl + id);
    }
  }

}
