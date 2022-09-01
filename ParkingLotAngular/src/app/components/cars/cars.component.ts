import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarBrands } from 'src/app/models/car-brands/car-brands';
import { CarTypes } from 'src/app/models/car-types/car-types';
import { CarPost, Cars } from 'src/app/models/cars/cars';
import { CarBrandsService } from 'src/app/services/car-brands/car-brands.service';
import { CarTypesService } from 'src/app/services/car-types/car-types.service';
import { CarsService } from 'src/app/services/cars/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  public _cars : Cars[];
  public _selectedCar : Cars;

  public selectedCarBrand: number;
  public _carBrands: CarBrands[];

  public selectedCarType: number;
  public _carTypes: CarTypes[];

  formGroup: FormGroup;
  newRegistrationNumber: string;
  newCar: CarPost;

  listExists: boolean = false;

  constructor(private _carsService: CarsService, private _carBrandsService: CarBrandsService, private _carTypesService: CarTypesService) { }

  ngOnInit(): void {

    this.createForm();

    this._carsService.getCars().subscribe(data =>{
      this._cars = data;
      if(data.length != 0){
        this.listExists = true;
        console.log(this.listExists);
      }
    });

    this._carBrandsService.getCarBrands().subscribe(data =>{
      this._carBrands = data;
    });

    this._carTypesService.getCarTypes().subscribe(data =>{
      this._carTypes = data;
    });

  }

  public createForm(){
    this.formGroup = new FormGroup({
      newRegistrationNumber : new FormControl()
    });
  }

  rowSelected(selector : Cars){
    this._selectedCar = selector;
    console.log(this._selectedCar);
  }

  updateSelectedBrand(e: Event){
    const element = e.target as HTMLSelectElement;
    this.selectedCarBrand = Number(element.value);
  }

  updateSelectedType(e: Event){
    const element = e.target as HTMLSelectElement;
    this.selectedCarType = Number(element.value);
  }

  createCar(){
    this.newRegistrationNumber = this.formGroup.controls['newRegistrationNumber'].value;
    this.newCar = new CarPost(0,this.selectedCarBrand,this.selectedCarType,this.newRegistrationNumber);
    this._carsService.createCar(this.newCar).subscribe(data => {
      this._cars.push(data as Cars);
      if(data != null){
        this.listExists = true;
        console.log(this.listExists);
      }
    });
  }

  deleteButton(){
    console.log(this._selectedCar.idCar);
    this._carsService.deleteCar(this._selectedCar.idCar)?.subscribe(() => {
      this._cars.pop();
      if(this._cars.length == 0){
        this.listExists = false;
        console.log(this.listExists);
      }
    });
  }

}
