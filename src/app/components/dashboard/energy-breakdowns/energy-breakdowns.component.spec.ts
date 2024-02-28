import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyBreakdownsComponent } from './energy-breakdowns.component';

describe('EnergyBreakdownsComponent', () => {
  let component: EnergyBreakdownsComponent;
  let fixture: ComponentFixture<EnergyBreakdownsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyBreakdownsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyBreakdownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
