import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNavbarIconComponent } from './home-navbar-icon.component';

describe('HomeNavbarIconComponent', () => {
  let component: HomeNavbarIconComponent;
  let fixture: ComponentFixture<HomeNavbarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeNavbarIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNavbarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
