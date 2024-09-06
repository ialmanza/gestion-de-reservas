import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReservacionComponent } from './editar-reservacion.component';

describe('EditarReservacionComponent', () => {
  let component: EditarReservacionComponent;
  let fixture: ComponentFixture<EditarReservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarReservacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
