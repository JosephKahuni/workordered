import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePrimaryComponent } from './change-primary.component';

describe('ChangePrimaryComponent', () => {
  let component: ChangePrimaryComponent;
  let fixture: ComponentFixture<ChangePrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePrimaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
