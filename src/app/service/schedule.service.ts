import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../model/employee';
import * as moment from 'moment';

@Injectable()
export class ScheduleService {

  private _scheduleData: BehaviorSubject<Object[]>;
  private scheduleDataOrigin:Object[];
  private startDateFilter:Date;
  private endDateFilter:Date;

  constructor(private employeeService: EmployeeService) {
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
      this._scheduleData.next(this.applyByPeriod(this.startDateFilter, this.endDateFilter, this.scheduleDataOrigin));
    });
  }

  get scheduleData(): Observable<Object[]> {
    return this._scheduleData.asObservable();
  }

  filterByPeriod(start:Date, end:Date) {
    this.startDateFilter = start;
    this.endDateFilter = end;
    this._scheduleData.next(this.applyByPeriod(start, end, this.scheduleDataOrigin));
  }

  private applyByPeriod(start:Date, end: Date, data: Object[]): Object[]{
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
