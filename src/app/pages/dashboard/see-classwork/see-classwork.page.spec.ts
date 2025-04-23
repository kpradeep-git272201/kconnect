import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeClassworkPage } from './see-classwork.page';

describe('SeeClassworkPage', () => {
  let component: SeeClassworkPage;
  let fixture: ComponentFixture<SeeClassworkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeClassworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
