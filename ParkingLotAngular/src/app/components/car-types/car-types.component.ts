import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarTypes } from 'src/app/models/car-types/car-types';
import { CarTypesService } from 'src/app/services/car-types/car-types.service';

@Component({
  selector: 'app-car-types',
  templateUrl: './car-types.component.html',
  styleUrls: ['./car-types.component.scss']
})
export class CarTypesComponent implements OnInit {

  public _carTypes : CarTypes[];
  public _selectedCarType : CarTypes;

  formGroup: FormGroup;
  newCarTypeName: string;
  newCarType: CarTypes;

  idSelectedCarType : number;
  status : string;

  listExists: boolean = false;

  constructor(private _carTypesService: CarTypesService) { }

  ngOnInit(): void {
    this.createForm();
    this._carTypesService.getCarTypes().subscribe(data =>{
      this._carTypes = data;
      if(data.length != 0){
        this.listExists = true;
        console.log(this.listExists);
      }
    });
  }

  rowSelected(selector : CarTypes){
    this._selectedCarType = selector;
    console.log(this._selectedCarType);
  }

  public test(){
    console.log("am intrat");
  }

  public createForm(){
    this.formGroup = new FormGroup({
      newCarTypeName : new FormControl()
    });
  }

  createCarType(){
    this.newCarTypeName = this.formGroup.controls['newCarTypeName'].value;
    this.newCarType = new CarTypes(0,this.newCarTypeName);
    this._carTypesService.createCarType(this.newCarType).subscribe(data => {
      this._carTypes.push(data as CarTypes);
      if(data != null){
        this.listExists = true;
        console.log(this.listExists);
      }
    });
  }

  deleteButton(){
    console.log(this._selectedCarType.idCarType);
    this._carTypesService.deleteCarType(this._selectedCarType.idCarType)?.subscribe(() => {
      this._carTypes.pop();
      if(this._carTypes.length == 0){
        this.listExists = false;
        console.log(this.listExists);
      }
    });
  }

}
