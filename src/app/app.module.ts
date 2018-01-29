import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './service/user.service';
import {LoaderService} from './service/loader.service';
import { routing } from './app.routes';
import {AuthGuardService} from './service/auth-guard.service';
import {EmployeeService} from './service/employee.service';
import {DialogsService} from './service/dialogs.service';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { MatPaginatorIntl} from '@angular/material';
import { MatPaginatorIntlCustom } from './util/mat-paginator-intl-custom';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UserAvatarComponent } from './component/user-avatar/user-avatar.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { LandingComponent } from './component/landing/landing.component';
import { HomeComponent } from './component/home/home.component';
import { EmployeeComponent, BoardingDateDialog } from './component/employee/employee.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from './component/message-dialog/message-dialog.component';
import { BoardingChartComponent } from './component/boarding-chart/boarding-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserAvatarComponent,
    LoginComponent,
    PageNotFoundComponent,
    LandingComponent,
    HomeComponent,
    EmployeeComponent,
    ScheduleComponent,
    BoardingDateDialog,
    ConfirmDialogComponent,
    MessageDialogComponent,
    BoardingChartComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxChartsModule,
  ],
  entryComponents: [NavbarComponent, BoardingDateDialog, ConfirmDialogComponent, MessageDialogComponent],
  providers: [UserService, LoaderService, AuthGuardService, EmployeeService, DialogsService,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlCustom}],
  bootstrap: [AppComponent]
})
export class AppModule { }
