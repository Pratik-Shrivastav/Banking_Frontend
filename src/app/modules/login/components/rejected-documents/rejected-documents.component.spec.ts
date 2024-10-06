import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedDocumentsComponent } from './rejected-documents.component';

describe('RejectedDocumentsComponent', () => {
  let component: RejectedDocumentsComponent;
  let fixture: ComponentFixture<RejectedDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectedDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
