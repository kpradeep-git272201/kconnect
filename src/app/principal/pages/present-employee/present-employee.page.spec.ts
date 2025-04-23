import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresentEmployeePage } from './present-employee.page';

describe('PresentEmployeePage', () => {
  let component: PresentEmployeePage;
  let fixture: ComponentFixture<PresentEmployeePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
