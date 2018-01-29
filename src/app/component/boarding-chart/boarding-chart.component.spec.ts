import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingChartComponent } from './boarding-chart.component';

describe('BoardingChartComponent', () => {
  let component: BoardingChartComponent;
  let fixture: ComponentFixture<BoardingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
