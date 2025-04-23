import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAttendancePage } from './my-attendance.page';

describe('MyAttendancePage', () => {
  let component: MyAttendancePage;
  let fixture: ComponentFixture<MyAttendancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
