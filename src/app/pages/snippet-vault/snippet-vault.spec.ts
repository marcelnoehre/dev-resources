import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetVault } from './snippet-vault';

describe('SnippetVault', () => {
  let component: SnippetVault;
  let fixture: ComponentFixture<SnippetVault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnippetVault]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnippetVault);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
