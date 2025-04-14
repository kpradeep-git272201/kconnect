import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalDashboardPage } from './principal-dashboard.page';

describe('PrincipalDashboardPage', () => {
  let component: PrincipalDashboardPage;
  let fixture: ComponentFixture<PrincipalDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
