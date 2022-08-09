//TOBEDELETED
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAPIComponentComponent } from './test-apicomponent.component';

describe('TestAPIComponentComponent', () => {
  let component: TestAPIComponentComponent;
  let fixture: ComponentFixture<TestAPIComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAPIComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAPIComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
