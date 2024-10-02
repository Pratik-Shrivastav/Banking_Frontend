import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSuccessSalaryDisbursementComponent } from './view-success-salary-disbursement.component';

describe('ViewSuccessSalaryDisbursementComponent', () => {
  let component: ViewSuccessSalaryDisbursementComponent;
  let fixture: ComponentFixture<ViewSuccessSalaryDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSuccessSalaryDisbursementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSuccessSalaryDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
