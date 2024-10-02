import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSuccessPaymentComponent } from './view-success-payment.component';

describe('ViewSuccessPaymentComponent', () => {
  let component: ViewSuccessPaymentComponent;
  let fixture: ComponentFixture<ViewSuccessPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSuccessPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSuccessPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
