import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarsInParkingLot, Entries, Exit } from 'src/app/models/parking-lot/entries';
import { Gate } from 'src/app/models/parking-lot/gate';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  private baseUrlEntry = 'https://localhost:7135/api/Entries/';
  private baseUrlGate = 'https://localhost:7135/api/Gates/';
  private baseUrlExit = 'https://localhost:7135/api/Exits/';

  constructor(private http : HttpClient) { }

  public getGates() : Observable<Gate[]>{
    return this.http.get<Gate[]>(this.baseUrlGate);
  }

  public createEntry(car : Entries){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(car);
    return this.http.post(this.baseUrlEntry, body,{'headers':headers});
  }

  public getEntries() : Observable<CarsInParkingLot[]>{
    return this.http.get<CarsInParkingLot[]>(this.baseUrlEntry);
  }

  public createExit(car : Exit){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(car);
    return this.http.post(this.baseUrlExit, body,{'headers':headers});
  }

  public deleteEntry(id : number){
    if(id == 0){
      return null;
    }else{
      return this.http.delete<Entries>(this.baseUrlEntry + id);
    }
  }

}
