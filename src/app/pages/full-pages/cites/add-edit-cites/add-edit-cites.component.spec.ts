import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCitesComponent } from './add-edit-cites.component';

describe('AddEditCitesComponent', () => {
  let component: AddEditCitesComponent;
  let fixture: ComponentFixture<AddEditCitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
