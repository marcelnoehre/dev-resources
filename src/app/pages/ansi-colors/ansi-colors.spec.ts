import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsiColors } from './ansi-colors';

describe('AnsiColors', () => {
  let component: AnsiColors;
  let fixture: ComponentFixture<AnsiColors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnsiColors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsiColors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
