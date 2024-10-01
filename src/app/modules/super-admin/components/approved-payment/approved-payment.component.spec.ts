import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPaymentComponent } from './approved-payment.component';

describe('ApprovedPaymentComponent', () => {
  let component: ApprovedPaymentComponent;
  let fixture: ComponentFixture<ApprovedPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
