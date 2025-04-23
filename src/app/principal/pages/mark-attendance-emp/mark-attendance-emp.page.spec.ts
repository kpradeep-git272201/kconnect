import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkAttendanceEmpPage } from './mark-attendance-emp.page';

describe('MarkAttendanceEmpPage', () => {
  let component: MarkAttendanceEmpPage;
  let fixture: ComponentFixture<MarkAttendanceEmpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkAttendanceEmpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
