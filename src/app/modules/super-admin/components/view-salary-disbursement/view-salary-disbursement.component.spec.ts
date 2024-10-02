import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalaryDisbursementComponent } from './view-salary-disbursement.component';

describe('ViewSalaryDisbursementComponent', () => {
  let component: ViewSalaryDisbursementComponent;
  let fixture: ComponentFixture<ViewSalaryDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSalaryDisbursementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSalaryDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
