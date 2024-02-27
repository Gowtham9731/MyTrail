import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuthusuComponent } from './puthusu.component';

describe('PuthusuComponent', () => {
  let component: PuthusuComponent;
  let fixture: ComponentFixture<PuthusuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuthusuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuthusuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
