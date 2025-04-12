import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OwnerDashbaordPage } from './owner-dashbaord.page';

describe('OwnerDashbaordPage', () => {
  let component: OwnerDashbaordPage;
  let fixture: ComponentFixture<OwnerDashbaordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDashbaordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
