import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsuccesspaymentComponent } from './viewsuccesspayment.component';

describe('ViewsuccesspaymentComponent', () => {
  let component: ViewsuccesspaymentComponent;
  let fixture: ComponentFixture<ViewsuccesspaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewsuccesspaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsuccesspaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
