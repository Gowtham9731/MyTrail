import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManiReportComponent } from './mani-report.component';

describe('ManiReportComponent', () => {
  let component: ManiReportComponent;
  let fixture: ComponentFixture<ManiReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManiReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
