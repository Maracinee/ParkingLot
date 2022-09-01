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

  ngOnInit(): void {
    
  }

}
