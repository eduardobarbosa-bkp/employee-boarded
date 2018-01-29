import { Component } from '@angular/core';
import {UserService} from './service/user.service';
import {LoaderService} from './service/loader.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public isSpinnerVisible: boolean;

  private subscription: Subscription;

  constructor(private userService: UserService, private loaderService:LoaderService) {

    this.subscription = this.loaderService
      .pendingRequestsStatus
      .subscribe(hasPendingRequests => {
        this.isSpinnerVisible = hasPendingRequests;
      });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
