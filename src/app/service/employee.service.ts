import { Injectable} from '@angular/core';
import {Employee} from '../model/employee';
import {BehaviorSubject, Observable} from 'rxjs';
import {DialogsService} from './dialogs.service';
import * as moment from 'moment';

@Injectable()
export class EmployeeService {

  private _employees: BehaviorSubject<Employee[]>;

  get employees(): Observable<Employee[]> {
    return this._employees.asObservable();
  }

  constructor(private dialogsService: DialogsService) {
    this._employees = new BehaviorSubject([
      {
        id:this.generateUUID(),  name: 'Eduardo Barbosa da Costa', role: 'Senior Software Developer', company:'Halliburton',
        boardingDates:[
          {start:new Date(2018, 3, 1), end: new Date(2018, 3, 15)},
          {start:new Date(2018, 4, 1), end: new Date(2018, 4, 15)},
          {start:new Date(2018, 5, 1), end: new Date(2018, 5, 15)}
        ]
      },
      {
        id:this.generateUUID(),  name: 'Ana Luiza', role: 'Tester and Quality Assurance', company:'Halliburton',
        boardingDates:[
          {start:new Date(2018, 4, 1), end: new Date(2018, 4, 15)}
        ]
      },
      {
        id:this.generateUUID(),  name: 'Marco Antônio', role: 'Manager', company:'Petrobras',
        boardingDates:[
          {start:new Date(2018, 3, 1), end: new Date(2018, 3, 15)}
        ]
      },
      {
        id:this.generateUUID(),  name: 'Luiz da Silva', role: 'Developer', company:'Petrobras',
        boardingDates:[
          {start:new Date(2018, 3, 1), end: new Date(2018, 3, 15)}
        ]
      }
    ]);

  }

  public delete(id:String){
     var list:Employee[] = this._employees.getValue();
     for(var i = 0 ; i < list.length; i++){
       if(list[i].id === id){
         list.splice(i, 1);
       }
     }
     this._employees.next(list);
  }

  public save(employee:Employee){
    employee.id = this.generateUUID();
    var list:Employee[] = this._employees.getValue();
    list.push(employee);
    this._employees.next(list);
  }

  public update(employee:Employee){
    var list:Employee[] = this._employees.getValue();
    for(var i = 0 ; i < list.length; i++){
      if(list[i].id === employee.id){
        list[i] = employee;
      }
    }
    this._employees.next(list);
  }

  public addBoardingDate(employeeId:string, start:Date, end:Date): boolean {

    var list:Employee[] = this._employees.getValue();
    for(var i = 0 ; i < list.length; i++){
      if(list[i].id === employeeId){
        if(this.validateBoardingDate(list[i], start, end)) {
          list[i].boardingDates.push({start: start, end: end});
         }else{
          return false;
        }
      }
    }
    this._employees.next(list);
    return true;
  }

  private validateBoardingDate(employee:Employee, start:Date, end:Date): boolean{

    if(moment(start).isSameOrAfter(end,  'day')){
      this.dialogsService.info("A data de fim deve ser posterior a data de início!");
      return false;
    }

    for(var i = 0 ; i < employee.boardingDates.length; i++){
      var boardingDate = employee.boardingDates[i];
      if(moment(start).isBetween(boardingDate.start, boardingDate.end, 'days', '[]')
        || moment(end).isBetween(boardingDate.start, boardingDate.end, 'days', '[]')){
        this.dialogsService.info("Existe sobreposição de datas!");
        return false;
      }
    }
    return true;
  }

  public deleteBoardingDate(employeeId:string, index:number){
    var list:Employee[] = this._employees.getValue();
    for(var i = 0 ; i < list.length; i++){
      if(list[i].id === employeeId){
        list[i].boardingDates.splice(index, 1);
      }
    }
    this._employees.next(list);
  }

  private generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

}
