import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickynavComponent } from './stickynav.component';

describe('StickynavComponent', () => {
  let component: StickynavComponent;
  let fixture: ComponentFixture<StickynavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickynavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickynavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
