import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentAttendancePage } from './student-attendance.page';

describe('StudentAttendancePage', () => {
  let component: StudentAttendancePage;
  let fixture: ComponentFixture<StudentAttendancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
