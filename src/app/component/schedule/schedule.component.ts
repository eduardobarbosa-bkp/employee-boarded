import { Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ScheduleService} from '../../service/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  displayedColumns = ['employeeName', 'start', 'end'];
  dataSource: MatTableDataSource<Object>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDateFilter:Date;
  endDateFilter:Date;

  constructor(private scheduleService: ScheduleService) {
    this.dataSource = new MatTableDataSource();

    this.scheduleService.scheduleData.subscribe(data => {
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
    this.scheduleService.filterByPeriod(this.startDateFilter, this.endDateFilter);
  }

}
