import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialnewsComponent } from './financialnews.component';

describe('FinancialnewsComponent', () => {
  let component: FinancialnewsComponent;
  let fixture: ComponentFixture<FinancialnewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialnewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
