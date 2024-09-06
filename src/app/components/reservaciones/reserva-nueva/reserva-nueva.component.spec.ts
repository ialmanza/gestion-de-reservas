import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaNuevaComponent } from './reserva-nueva.component';

describe('ReservaNuevaComponent', () => {
  let component: ReservaNuevaComponent;
  let fixture: ComponentFixture<ReservaNuevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaNuevaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
