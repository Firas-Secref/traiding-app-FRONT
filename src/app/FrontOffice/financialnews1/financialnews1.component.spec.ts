import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Financialnews1Component } from './financialnews1.component';

describe('Financialnews1Component', () => {
  let component: Financialnews1Component;
  let fixture: ComponentFixture<Financialnews1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Financialnews1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Financialnews1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
