import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttendanceSuccessModalComponent } from './attendance-success-modal.component';

describe('AttendanceSuccessModalComponent', () => {
  let component: AttendanceSuccessModalComponent;
  let fixture: ComponentFixture<AttendanceSuccessModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceSuccessModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
