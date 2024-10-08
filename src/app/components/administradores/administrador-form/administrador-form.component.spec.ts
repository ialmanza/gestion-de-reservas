import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorFormComponent } from './administrador-form.component';

describe('AdministradorFormComponent', () => {
  let component: AdministradorFormComponent;
  let fixture: ComponentFixture<AdministradorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
