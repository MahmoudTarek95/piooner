import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactUsFormComponent } from './view-contact-us-form.component';

describe('ViewContactUsFormComponent', () => {
  let component: ViewContactUsFormComponent;
  let fixture: ComponentFixture<ViewContactUsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewContactUsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContactUsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
