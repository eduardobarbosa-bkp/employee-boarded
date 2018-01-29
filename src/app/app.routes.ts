import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AuthGuardService } from './service/auth-guard.service';
import { EmployeeComponent } from './component/employee/employee.component';
import { ScheduleComponent } from './component/schedule/schedule.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuardService] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);
