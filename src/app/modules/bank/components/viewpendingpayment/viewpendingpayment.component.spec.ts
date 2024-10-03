import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpendingpaymentComponent } from './viewpendingpayment.component';

describe('ViewpendingpaymentComponent', () => {
  let component: ViewpendingpaymentComponent;
  let fixture: ComponentFixture<ViewpendingpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewpendingpaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpendingpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
