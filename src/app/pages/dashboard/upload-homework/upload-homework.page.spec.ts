import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadHomeworkPage } from './upload-homework.page';

describe('UploadHomeworkPage', () => {
  let component: UploadHomeworkPage;
  let fixture: ComponentFixture<UploadHomeworkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadHomeworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
