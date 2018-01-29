import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boarding-chart',
  templateUrl: './boarding-chart.component.html',
  styleUrls: ['./boarding-chart.component.css']
})
export class BoardingChartComponent implements OnInit {

  single: any[] = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];

  // options
  xAxisLabel = 'Data';
  yAxisLabel = 'Funcionários';

  constructor() { }

  ngOnInit() {
  }

}
