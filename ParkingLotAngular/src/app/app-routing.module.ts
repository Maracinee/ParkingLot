import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarBrandsComponent } from './components/car-brands/car-brands.component';
import { CarTypesComponent } from './components/car-types/car-types.component';
import { CarsComponent } from './components/cars/cars.component';
import { HomeComponent } from './components/home/home.component';
import { ParkingLotComponent } from './components/parking-lot/parking-lot.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

/*const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: ToolbarComponent,
    children: [
      {
        path: 'car-brands',
        loadChildren: () => import('./components/car-brands/car-brands.component').then((m) => m.CarBrandsComponent)
      }
    ]
  },
];
*/


const routes: Routes = [
  { 
    path: 'car-brands', 
    component : CarBrandsComponent,
    title: 'Car Brands'
  },
  { 
    path: 'car-types', 
    component : CarTypesComponent,
    title: 'Car Types'
  },
  { 
    path: 'cars',
    component : CarsComponent,
    title: 'Cars'
  },
  { 
    path: 'parking-lot', 
    component : ParkingLotComponent,
    title: 'Parking Lot'
  },
  { 
    path: '', 
    component : HomeComponent,
    title : 'Home'
  }
];

@NgModule({
  //imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
