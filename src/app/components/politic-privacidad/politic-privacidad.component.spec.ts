import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticPrivacidadComponent } from './politic-privacidad.component';

describe('PoliticPrivacidadComponent', () => {
  let component: PoliticPrivacidadComponent;
  let fixture: ComponentFixture<PoliticPrivacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticPrivacidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
