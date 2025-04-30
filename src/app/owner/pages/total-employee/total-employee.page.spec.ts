import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalEmployeePage } from './total-employee.page';

describe('TotalEmployeePage', () => {
  let component: TotalEmployeePage;
  let fixture: ComponentFixture<TotalEmployeePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
