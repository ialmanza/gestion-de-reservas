import { TestBed } from '@angular/core/testing';

import { DataReservacionesService } from './data-reservaciones.service';

describe('DataReservacionesService', () => {
  let service: DataReservacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataReservacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
