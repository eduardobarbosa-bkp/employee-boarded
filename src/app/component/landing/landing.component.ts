import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public userService: UserService, public router: Router) {
     if(this.userService.currentUser != null){
       this.router.navigate(['/home']);
     }
  }

  ngOnInit() {
  }

}
