import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarTypes } from 'src/app/models/car-types/car-types';

@Injectable({
  providedIn: 'root'
})
export class CarTypesService {

  private baseUrl = 'https://localhost:7135/api/CarTypes/';

  constructor(private http : HttpClient) { }

  public getCarTypes() : Observable<CarTypes[]>{
    return this.http.get<CarTypes[]>(this.baseUrl);
  }

  public getCarTypeById(id : number){
    return this.http.get<CarTypes>(this.baseUrl + id);
  }

  public deleteCarType(id : number){
    if(id == 0){
      return null;
    }else{
      return this.http.delete<CarTypes>(this.baseUrl + id);
    }
  }

  public createCarType(carType : CarTypes){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(carType);
    return this.http.post(this.baseUrl, body,{'headers':headers});
  }
  
}
