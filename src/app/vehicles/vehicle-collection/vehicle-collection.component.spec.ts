import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCollectionComponent } from './vehicle-collection.component';

describe('VehicleCollectionComponent', () => {
  let component: VehicleCollectionComponent;
  let fixture: ComponentFixture<VehicleCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
