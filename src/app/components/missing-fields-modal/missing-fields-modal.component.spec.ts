import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingFieldsModalComponent } from './missing-fields-modal.component';

describe('MissingFieldsModalComponent', () => {
  let component: MissingFieldsModalComponent;
  let fixture: ComponentFixture<MissingFieldsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingFieldsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingFieldsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
