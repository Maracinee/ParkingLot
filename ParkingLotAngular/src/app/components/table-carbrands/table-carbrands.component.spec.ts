import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCarbrandsComponent } from './table-carbrands.component';

describe('TableCarbrandsComponent', () => {
  let component: TableCarbrandsComponent;
  let fixture: ComponentFixture<TableCarbrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCarbrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCarbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
