import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarBrands } from 'src/app/models/car-brands/car-brands';

@Injectable({
  providedIn: 'root'
})
export class CarBrandsService {

  private baseUrl = 'https://localhost:7135/api/CarBrands/';

  constructor(private http : HttpClient) { }

  public getCarBrands() : Observable<CarBrands[]>{
    return this.http.get<CarBrands[]>(this.baseUrl);
  }

  public getCarBrandById(id : number){
    return this.http.get<CarBrands>(this.baseUrl + id);
  }

  public deleteCarBrand(id : number){
    if(id == 0){
      return null;
    }else{
      return this.http.delete<CarBrands>(this.baseUrl + id);
    }
  }

  public createCarBrand(carBrand : CarBrands){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(carBrand);
    return this.http.post(this.baseUrl, body,{'headers':headers});
  }
}
