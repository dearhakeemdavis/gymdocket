import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorModalPage } from './calculator-modal.page';

describe('CalculatorModalPage', () => {
  let component: CalculatorModalPage;
  let fixture: ComponentFixture<CalculatorModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
