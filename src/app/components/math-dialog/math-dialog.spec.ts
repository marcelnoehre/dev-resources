import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathDialog } from './math-dialog';

describe('MathDialog', () => {
  let component: MathDialog;
  let fixture: ComponentFixture<MathDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
