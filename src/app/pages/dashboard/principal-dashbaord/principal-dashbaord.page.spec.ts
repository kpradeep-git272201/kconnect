import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalDashbaordPage } from './principal-dashbaord.page';

describe('PrincipalDashbaordPage', () => {
  let component: PrincipalDashbaordPage;
  let fixture: ComponentFixture<PrincipalDashbaordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalDashbaordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
