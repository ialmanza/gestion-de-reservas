import { TestBed } from '@angular/core/testing';

import { RolesBdService } from './roles-bd.service';

describe('RolesBdService', () => {
  let service: RolesBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
