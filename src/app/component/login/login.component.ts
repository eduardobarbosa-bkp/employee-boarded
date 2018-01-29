import { Component, ViewChild, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';
import {UserService} from '../../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  form: FormGroup;

  constructor(private fb: FormBuilder, public userService: UserService) {
   var username = new FormControl("admin", Validators.required);
   var password = new FormControl("admin", Validators.required);
    this.form = fb.group({
      "username": username,
      "password":password
     });
  }

  ngOnInit() {

  }

  onSubmit():void {
    if(this.form.valid) {
      this.userService.login(this.form.value);
    }
  }

}
