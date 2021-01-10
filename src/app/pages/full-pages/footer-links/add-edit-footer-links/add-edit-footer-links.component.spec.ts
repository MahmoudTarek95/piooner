import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFooterLinksComponent } from './add-edit-footer-links.component';

describe('AddEditFooterLinksComponent', () => {
  let component: AddEditFooterLinksComponent;
  let fixture: ComponentFixture<AddEditFooterLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFooterLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFooterLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
