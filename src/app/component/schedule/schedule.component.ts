import { Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EmployeeService} from '../../service/employee.service';
import {Employee} from '../../model/employee';
import {BehaviorSubject, Observable} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  private _scheduleData: BehaviorSubject<Object[]>;
  displayedColumns = ['employeeName', 'start', 'end'];
  dataSource: MatTableDataSource<Object>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDateFilter:Date;
  endDateFilter:Date;
  scheduleDataOrigin:Object[];

  get scheduleData(): Observable<Object[]> {
    return this._scheduleData.asObservable();
  }

  constructor(private employeeService: EmployeeService) {
    this.dataSource = new MatTableDataSource();

    this._scheduleData = new BehaviorSubject([]);
    this.employeeService.employees.subscribe(value => {
      var result = [];
      value.forEach(employee => {
        employee.boardingDates.forEach(boardingDate => {
          result.push(new Object(
            {employeeId: employee.id, employeeName: employee.name, start: boardingDate.start, end: boardingDate.end }
          ));
        });
      });
      this.scheduleDataOrigin = result;
      this._scheduleData.next(this.filterByPeriod(this.startDateFilter, this.endDateFilter, this.scheduleDataOrigin));
    });


    this.scheduleData.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    this._scheduleData.next(this.filterByPeriod(this.startDateFilter, this.endDateFilter, this.scheduleDataOrigin));
  }

  private filterByPeriod(start:Date, end: Date, data: Object[]): Object[]{
    var filteredData:Object[] = [];
    data.filter(rec => {
       return (!start || moment(start).isSameOrBefore(rec['start'], 'day'))
              &&(!end || moment(end).isSameOrAfter(rec['end'], 'day'));
    }).forEach(rec => {
       filteredData.push(rec);
    });
    return filteredData;
  }


}
