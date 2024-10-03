import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientPendingComponent } from './view-client-pending.component';

describe('ViewClientPendingComponent', () => {
  let component: ViewClientPendingComponent;
  let fixture: ComponentFixture<ViewClientPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewClientPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
