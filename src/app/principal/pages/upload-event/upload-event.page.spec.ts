import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadEventPage } from './upload-event.page';

describe('UploadEventPage', () => {
  let component: UploadEventPage;
  let fixture: ComponentFixture<UploadEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
