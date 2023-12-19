import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradebodyComponent } from './tradebody.component';

describe('TradebodyComponent', () => {
  let component: TradebodyComponent;
  let fixture: ComponentFixture<TradebodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradebodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradebodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
