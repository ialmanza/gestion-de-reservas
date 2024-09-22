import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleChangePassComponent } from './role-change-pass.component';

describe('RoleChangePassComponent', () => {
  let component: RoleChangePassComponent;
  let fixture: ComponentFixture<RoleChangePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleChangePassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
