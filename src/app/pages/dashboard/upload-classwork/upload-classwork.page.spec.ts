import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadClassworkPage } from './upload-classwork.page';

describe('UploadClassworkPage', () => {
  let component: UploadClassworkPage;
  let fixture: ComponentFixture<UploadClassworkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadClassworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
