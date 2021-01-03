import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableSharedComponent } from './datatable-shared.component';

describe('DatatableSharedComponent', () => {
  let component: DatatableSharedComponent;
  let fixture: ComponentFixture<DatatableSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatableSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
