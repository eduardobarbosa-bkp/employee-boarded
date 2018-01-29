import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../service/schedule.service';
import * as moment from 'moment';

@Component({
  selector: 'app-boarding-chart',
  templateUrl: './boarding-chart.component.html',
  styleUrls: ['./boarding-chart.component.css']
})
export class BoardingChartComponent implements OnInit {

  chartData: any[];

  blueScheme: any = {
    domain: ['#0D47A1', '#1976D2', '#039BE5', '#29B6F6', '#81D4FA', '#B2EBF2'],
  };

  orangeScheme: any = {
    domain: ['#BF360C', '#EF6C00', '#FB8C00', '#FFB300', '#FFCA28', '#FFF176'],
  };

  blueOrangeScheme: any = {
    domain: ['#0D47A1', '#01579B', '#1976D2', '#039BE5', '#00BCD4', '#FB8C00', '#FFA726', '#FFCC80', '#FFECB3'],
  };

  // options
  xAxisLabel = 'Período';
  yAxisLabel = 'Funcionários';

  constructor(private scheduleService: ScheduleService) {

    this.scheduleService.scheduleData.subscribe(data => {
      var result = [];
      var allMonthsInPeriod = [];
      data.forEach(boardingDate => {
        moment.locale('pt-br');
        var startDate = moment(boardingDate['start']);
        var endDate = moment(boardingDate['end']);
        while (startDate.isBefore(endDate)) {
          allMonthsInPeriod.push(startDate.format("MMM/YYYY"));
          startDate = startDate.add(1, "month");
        }
      });

      for(var i= 0; i < allMonthsInPeriod.length; i++){
        var month = allMonthsInPeriod[i];
        var count = 1;
        var index = -1;
        for(var j = 0; j < result.length; j++) {
          var item = result[j];
          if (item.hasOwnProperty('name') && item.name === month) {
             count += item.value;
             index = j;
             break;
          }
        }
        if(index != -1){
          result[j] = new Object(
            {name: month, value: count }
          );
        }else{
          result.push(new Object(
            {name: month, value: count }
          ));
        }
      }
      this.chartData = result;
    });

  }

  ngOnInit() {
  }

}
