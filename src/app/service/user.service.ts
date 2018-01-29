import { Injectable } from '@angular/core';
import {LoginComponent} from '../component/login/login.component';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {DialogsService} from './dialogs.service';

@Injectable()
export class UserService {

  private _loggedUser: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private dialogsService: DialogsService, private router: Router) { }

  get currentUser():Object{
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  get isLoggedUser(): Observable<boolean> {
    return this._loggedUser.asObservable();
  }

  logout(): void{
    localStorage.clear();
    this._loggedUser.next(false);
    this.router.navigate(['/login']);
  }

  login(data:any): void{

     if(data.username === 'admin' && data.password === 'admin') {
       localStorage.setItem('currentUser', JSON.stringify({name: data.username}));
       this._loggedUser.next(true);
       this.router.navigate(['/home']);
     }else{
       this.dialogsService.error('Usuário ou Senha invalidos!');
     }

  }

}
