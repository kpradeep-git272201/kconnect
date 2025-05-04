import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadAssignmentPage } from './upload-assignment.page';

describe('UploadAssignmentPage', () => {
  let component: UploadAssignmentPage;
  let fixture: ComponentFixture<UploadAssignmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAssignmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
