import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EmployeeService} from '../../service/employee.service';
import {DialogsService} from '../../service/dialogs.service';
import {Employee} from '../../model/employee';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns = ['name', 'role', 'company', 'actions'];
  selectedEmployee: Employee = null;
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sidenav') sidenav;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService,
              public dialog: MatDialog,
              private dialogsService: DialogsService) {
    this.dataSource = new MatTableDataSource();
    this.employeeService.employees.subscribe(data => {
      this.dataSource.data = data;
    });

    var id = new FormControl("");
    var name = new FormControl("", Validators.required);
    var role = new FormControl("", Validators.required);
    var company = new FormControl("", Validators.required);

    this.form = fb.group({
      "id": id,
      "name": name,
      "role":role,
      "company":company
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  selectEmployee(employee){
    this.selectedEmployee = employee;
    this.form.patchValue(this.selectedEmployee);
    this.sidenav.opened = true;
  }

  add(){
    this.selectEmployee(new Employee());
    this.selectedEmployee.name = "Novo Funcionário";
  }

  delete(id){
    this.dialogsService.confirm().subscribe(result =>{
      if(result){
        this.employeeService.delete(id);
      }
    });
  }

  save() {
    if(this.form.valid) {
      var employee:Employee = this.form.value;
      if(this.selectedEmployee.id){
        employee.boardingDates = this.selectedEmployee.boardingDates;
        this.employeeService.update(employee);
      }else{
        employee.boardingDates = [];
        this.employeeService.save(employee);
      }
      this.selectedEmployee = null;
      this.sidenav.opened = false;
    }
  }

  addBoardingDate(){
    this.dialog.open(BoardingDateDialog, {
      panelClass: 'no-padding-dialog',
      data: {
        employeeId:this.selectedEmployee.id
      }
    });
  }

  deleteBoardingDate(index:number){
    this.dialogsService.confirm().subscribe(result =>{
      if(result){
        this.employeeService.deleteBoardingDate(this.selectedEmployee.id, index);
      }
    });
  }

}

@Component({
  selector: 'boarding-date-dialog',
  templateUrl: 'boarding-date-dialog.html',
  styleUrls: ['./employee.component.css']
})
export class BoardingDateDialog {

   form: FormGroup;

   constructor(@Inject(MAT_DIALOG_DATA) data: any,
               private fb: FormBuilder,
               private employeeService: EmployeeService,
               private dialogRef: MatDialogRef<BoardingDateDialog>) {
     var employeeId = new FormControl("", Validators.required);
     var start = new FormControl("", Validators.required);
     var end = new FormControl("", Validators.required);

     this.form = fb.group({
       "employeeId": employeeId,
       "start": start,
       "end":end
     });

    this.form.patchValue({employeeId: data.employeeId});
   }

  saveBoardingDate() {
    if(this.form.valid) {
      var data = this.form.value;
      if(this.employeeService.addBoardingDate(data.employeeId, data.start, data.end)) {
        this.dialogRef.close(true);
      }
    }
  }

}
