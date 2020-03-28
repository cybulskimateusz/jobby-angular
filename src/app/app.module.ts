import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './shared/routing/app-routing.module';
import { AuthService } from './shared/services/auth.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyMailComponent } from './components/verify-mail/verify-mail.component';
import { SelectProfileComponent } from './components/select-profile/select-profile.component';
import { SelectRecruiterComponent } from './components/select-profile/select-recruiter/select-recruiter.component';
import { SelectJobComponent } from './components/select-profile/select-recruiter/select-job/select-job.component';
import { CreateJobComponent } from './components/select-profile/select-recruiter/select-job/create-job/create-job.component';
import { SelectLocationComponent } from './components/select-profile/select-recruiter/select-job/create-job/select-location/select-location.component';
import { SelectOccupationComponent } from './components/select-profile/select-recruiter/select-job/create-job/select-occupation/select-occupation.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyMailComponent,
    SelectProfileComponent,
    SelectRecruiterComponent,
    SelectJobComponent,
    CreateJobComponent,
    SelectLocationComponent,
    SelectOccupationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
