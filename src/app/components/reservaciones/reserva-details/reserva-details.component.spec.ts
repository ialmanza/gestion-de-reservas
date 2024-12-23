import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaDetailsComponent } from './reserva-details.component';

describe('ReservaDetailsComponent', () => {
  let component: ReservaDetailsComponent;
  let fixture: ComponentFixture<ReservaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
