import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../service/schedule.service';
import {EmployeeService} from '../../service/employee.service';
import * as moment from 'moment';

@Component({
  selector: 'app-boarding-chart',
  templateUrl: './boarding-chart.component.html',
  styleUrls: ['./boarding-chart.component.css']
})
export class BoardingChartComponent implements OnInit {

  lineChartData: any[];
  numberChartData: any[];

  blueScheme: any = {
    domain: ['#0D47A1', '#1976D2', '#039BE5', '#29B6F6', '#81D4FA', '#B2EBF2'],
  };

  // options
  xAxisLabel = 'Período';
  yAxisLabel = 'Funcionários';

  constructor(private scheduleService: ScheduleService, private employeeService: EmployeeService) {

    this.scheduleService.scheduleData.subscribe(data => {
      this.buildLineChartData(data);
    });

    this.employeeService.employees.subscribe(data => {
       this.buildNumberChartData(data);
    });

  }

  ngOnInit() {

  }


  buildLineChartData(schedules){
    var grouped = this.groupBy(schedules, 'companyName');
    var result = [];
    Object.keys(grouped).forEach(data => {
      var allMonthsInPeriod = [];
      var series = [];
      var boardingDates = grouped[data];
      boardingDates.forEach(boardingDate => {
        moment.locale('pt-br');
        var startDate = moment(boardingDate['start']);
        var endDate = moment(boardingDate['end']);
        while (startDate.isBefore(endDate)) {
          allMonthsInPeriod.push(startDate.format("MMM/YYYY"));
          startDate = startDate.add(1, "month");
        }
      });

      for (var i = 0; i < allMonthsInPeriod.length; i++) {
        var month = allMonthsInPeriod[i];
        var count = 1;
        var index = -1;
        for (var j = 0; j < series.length; j++) {
          var item = series[j];
          if (item.hasOwnProperty('name') && item.name === month) {
            count += item.value;
            index = j;
            break;
          }
        }
        if (index != -1) {
          series[j] = new Object(
            {name: month, value: count}
          );
        } else {
          series.push(new Object(
            {name: month, value: count}
          ));
        }
      }
      result.push(new Object({name: data, series: series}));

    });
    this.lineChartData = result;
  }

  buildNumberChartData(schedules){

    var result = [];

    var totalEmployee = 0;
    var groupedEmployee = this.groupBy(schedules, 'id');
    Object.keys(groupedEmployee).forEach(data => {
      totalEmployee +=  groupedEmployee[data].length;
    });
    result.push(new Object({name: "Funcionários", value: totalEmployee}));

    var groupedCompany = this.groupBy(schedules, 'company');
    result.push(new Object({name: "Empresas", value:  Object.keys(groupedCompany).length}));

    this.numberChartData = result;
}

  groupBy (array, prop){
    return array.reduce(function(groups, item) {
      var val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }


}


