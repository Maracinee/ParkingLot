import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarBrands } from 'src/app/models/car-brands/car-brands';
import { CarBrandsService } from 'src/app/services/car-brands/car-brands.service';

@Component({
  selector: 'app-table-carbrands',
  templateUrl: './table-carbrands.component.html',
  styleUrls: ['./table-carbrands.component.scss']
})
export class TableCarbrandsComponent implements OnInit {

  public _carBrands : CarBrands[];
  public _selectedCarBrand : CarBrands;

  formGroup: FormGroup;
  newCarBrandName: string;
  newCarBrand: CarBrands;

  idSelectedCarBrand : number;
  status : string;

  listExists: boolean = false;

  constructor(private _carBrandsService: CarBrandsService) { }

  ngOnInit(): void {
    this.createForm();
    this._carBrandsService.getCarBrands().subscribe(data =>{
      this._carBrands = data;
      if(data.length != 0){
        this.listExists = true;
        console.log(this.listExists);
      }
    });
  }

  rowSelected(selector : CarBrands){
    this._selectedCarBrand = selector;
    console.log(this._selectedCarBrand);
  }

  public createForm(){
    this.formGroup = new FormGroup({
      newCarBrandName : new FormControl()
    });
  }

  createCarBrand(){
    this.newCarBrandName = this.formGroup.controls['newCarBrandName'].value;
    this.newCarBrand = new CarBrands(0,this.newCarBrandName);
    this._carBrandsService.createCarBrand(this.newCarBrand).subscribe(data => {
      this._carBrands.push(data as CarBrands);
      if(data != null){
        this.listExists = true;
        console.log(this.listExists);
      }
    });
  }

  deleteButton(){
    console.log(this._selectedCarBrand.idCarBrand);
    this._carBrandsService.deleteCarBrand(this._selectedCarBrand.idCarBrand)?.subscribe(() => {
      this._carBrands.pop();
      if(this._carBrands.length == 0){
        this.listExists = false;
        console.log(this.listExists);
      }
    });
  }

}
