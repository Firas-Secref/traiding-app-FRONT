import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Financialnews2Component } from './financialnews2.component';

describe('Financialnews2Component', () => {
  let component: Financialnews2Component;
  let fixture: ComponentFixture<Financialnews2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Financialnews2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Financialnews2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
