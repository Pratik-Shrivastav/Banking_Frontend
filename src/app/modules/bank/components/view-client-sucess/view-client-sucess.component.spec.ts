import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientSucessComponent } from './view-client-sucess.component';

describe('ViewClientSucessComponent', () => {
  let component: ViewClientSucessComponent;
  let fixture: ComponentFixture<ViewClientSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewClientSucessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
