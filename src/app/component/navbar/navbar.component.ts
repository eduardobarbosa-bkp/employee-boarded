import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService) {
      userService.isLoggedUser.subscribe(logged => {
          if(logged){
            console.log('Usuario logado!');
          }
        }
      )
  }

  ngOnInit() {

  }

  logout(){
    this.userService.logout();
  }

}
