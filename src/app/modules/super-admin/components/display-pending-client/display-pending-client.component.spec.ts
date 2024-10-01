import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPendingClientComponent } from './display-pending-client.component';

describe('DisplayPendingClientComponent', () => {
  let component: DisplayPendingClientComponent;
  let fixture: ComponentFixture<DisplayPendingClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayPendingClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPendingClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
