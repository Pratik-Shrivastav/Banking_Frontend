import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingSalaryComponent } from './view-pending-salary.component';

describe('ViewPendingSalaryComponent', () => {
  let component: ViewPendingSalaryComponent;
  let fixture: ComponentFixture<ViewPendingSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPendingSalaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPendingSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
