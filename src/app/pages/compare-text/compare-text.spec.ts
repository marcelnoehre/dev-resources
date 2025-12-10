import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareText } from './compare-text';

describe('CompareText', () => {
  let component: CompareText;
  let fixture: ComponentFixture<CompareText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
