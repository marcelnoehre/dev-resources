import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatexFormatter } from './latex-formatter';

describe('LatexFormatter', () => {
  let component: LatexFormatter;
  let fixture: ComponentFixture<LatexFormatter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatexFormatter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatexFormatter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
