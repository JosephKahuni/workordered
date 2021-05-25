import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSecondaryComponent } from './change-secondary.component';

describe('ChangeSecondaryComponent', () => {
  let component: ChangeSecondaryComponent;
  let fixture: ComponentFixture<ChangeSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSecondaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
