import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval, map, Observable } from 'rxjs';
import { Cars } from 'src/app/models/cars/cars';
import { CarsInParkingLot, Entries, Exit } from 'src/app/models/parking-lot/entries';
import { Gate } from 'src/app/models/parking-lot/gate';
import { CarsService } from 'src/app/services/cars/cars.service';
import { ParkingLotService } from 'src/app/services/parking-lot/parking-lot.service';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.scss']
})
export class ParkingLotComponent implements OnInit {

  CurrentDate: Date = new Date();
  time$: Observable<any>;

  public _cars : Cars[];
  public _selectedCar : Cars;

  formGroup: FormGroup;

  public _gates : Gate[];
  public selectedGate: number;

  newTicketNumber: string;
  public newEntry: Entries;

  public _entries: Entries[];

  public _carsInParkingLot: CarsInParkingLot[];
  public _selectedCarInParkingLot : CarsInParkingLot;

  public selectedGateForExit: number;

  public newExit: Exit;
  public _exits: Exit[];

  constructor(private _carsService: CarsService, private _entriesService: ParkingLotService) { }

  ngOnInit(): void {
    this.time$ = this.getDate();
    this.createForm();
    this.getData();
  }

  getData(): void{
    this._carsService.getCars().subscribe(data =>{
      this._cars = data;
    });
    this._entriesService.getGates().subscribe(data =>{
      this._gates = data;
    });
    this._entriesService.getEntries().subscribe(data =>{
      this._carsInParkingLot = data;
    });
  }

  updateSelectedGate(e: Event){
    const element = e.target as HTMLSelectElement;
    this.selectedGate = Number(element.value);
  }

  createEntry(){
    this.newTicketNumber = this.formGroup.controls['newTicketNumber'].value;
    var ticket = Number(this.newTicketNumber);
    this.newEntry = new Entries(0,this.selectedGate,this._selectedCar.idCar,new Date(),ticket);
    this._entriesService.createEntry(this.newEntry).subscribe(data => {
      this._entries.push(data as Entries);
      this.getData();
    });
  }

  public createForm(){
    this.formGroup = new FormGroup({
      newTicketNumber : new FormControl()
    });
  }

  rowSelected(selector : Cars){
    this._selectedCar = selector;
  }

  getDate(){
    return interval(1000).pipe(map(_ => this.getDateTime()));
  }

  private getDateTime(){
    this.CurrentDate.setSeconds(this.CurrentDate.getSeconds() +1);
    return (
      this.CurrentDate.getUTCDay() + 
      '/' +
      this.CurrentDate.getMonth() + 
      '/' +
      this.CurrentDate.getFullYear() +
      ' ' + 
      this.CurrentDate.getHours() + 
      ':' +
      this.CurrentDate.getMinutes() +
      ':' +
      this.CurrentDate.getSeconds()
    )
  }

  rowSelectedParking(selector : CarsInParkingLot){
    this._selectedCarInParkingLot = selector;
  }

  updateSelectedGateforExit(e: Event){
    const element = e.target as HTMLSelectElement;
    this.selectedGateForExit = Number(element.value);
  }

  createExit(){
    this.newExit = new Exit(0, this.selectedGateForExit, this._selectedCarInParkingLot.idCar, new Date(), this._selectedCarInParkingLot.ticketNumber);
    this._entriesService.createExit(this.newExit).subscribe(data => {
      this._exits.push(data as Exit);
    });
    this._entriesService.deleteEntry(this._selectedCarInParkingLot.idEntry)?.subscribe(() => {
      this._entries.pop();
      this.getData();
    });
  }

}
