import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSuccessSalaryComponent } from './view-success-salary.component';

describe('ViewSuccessSalaryComponent', () => {
  let component: ViewSuccessSalaryComponent;
  let fixture: ComponentFixture<ViewSuccessSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSuccessSalaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSuccessSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
