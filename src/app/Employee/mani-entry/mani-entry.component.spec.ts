import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManiEntryComponent } from './mani-entry.component';

describe('ManiEntryComponent', () => {
  let component: ManiEntryComponent;
  let fixture: ComponentFixture<ManiEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManiEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManiEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
