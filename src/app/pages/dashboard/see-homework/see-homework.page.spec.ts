import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeHomeworkPage } from './see-homework.page';

describe('SeeHomeworkPage', () => {
  let component: SeeHomeworkPage;
  let fixture: ComponentFixture<SeeHomeworkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeHomeworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
