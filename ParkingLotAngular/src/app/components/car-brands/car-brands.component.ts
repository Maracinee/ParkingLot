import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, createPlatform, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { connect } from 'rxjs';
import { CarBrands } from 'src/app/models/car-brands/car-brands';
import { CarBrandsService } from 'src/app/services/car-brands/car-brands.service';

@Component({
  selector: 'app-car-brands',
  templateUrl: './car-brands.component.html',
  styleUrls: ['./car-brands.component.scss']
})
export class CarBrandsComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<CarBrands>;

  _carBrands : CarBrands[];
  displayedColumns: string[] = ['idCarBrand', 'brandName'];
  isRowSelected : boolean = false;
  selection : SelectionModel<CarBrands>;
  dataSource = new MatTableDataSource<CarBrands>;

  idSelectedCarBrand : number;
  status : string;

  formGroup: FormGroup;
  newCarBrandName: string;
  newCarBrand: CarBrands;

  constructor(private carBrandsService : CarBrandsService){
  }

  ngOnInit(): void {
    this.createForm();
    const allowMultiSelect = false;
    this.getCarBrands();
    this.selection = new SelectionModel<CarBrands>(allowMultiSelect, this._carBrands);
  }

  public createForm(){
    this.formGroup = new FormGroup({
      newCarBrandName : new FormControl()
    });
  }

  public getCarBrands(){
    this.carBrandsService.getCarBrands().subscribe((data: CarBrands[]) => {
      this.dataSource.data = data;
    });
  }

  getData(row: any){
    if(this.isRowSelected == false){
      this.idSelectedCarBrand = row.idCarBrand;
      this.isRowSelected = true;
    }
    else if(this.isRowSelected == true){
      this.idSelectedCarBrand = 0;
      this.isRowSelected = false;
    }
  }

  deleteButton(){
    console.log(this.idSelectedCarBrand);
    this.carBrandsService.deleteCarBrand(this.idSelectedCarBrand)?.subscribe(() => this.status = 'delete success');
  }
  
  createCarBrand(){
    this.newCarBrandName = this.formGroup.controls['newCarBrandName'].value;
    this.newCarBrand = new CarBrands(0,this.newCarBrandName);
    this.carBrandsService.createCarBrand(this.newCarBrand).subscribe(data => {
      this.dataSource.data.push(data as CarBrands);
    });
  }

}
