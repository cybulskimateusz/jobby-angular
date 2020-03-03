import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyMailComponent } from '../../components/verify-mail/verify-mail.component';
import { SelectProfileComponent } from '../../components/select-profile/select-profile.component';

import { AuthGuard } from '../guard/auth.guard';
import { SecureAuthenticatedGuard } from '../guard/secure-authenticated-pages.guard';
import { SelectProfileGuard } from '../guard/select-profile.guard';
import { SecureProfiledGuard } from '../guard/secure-profiled.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [SelectProfileGuard, AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [SecureAuthenticatedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [SecureAuthenticatedGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureAuthenticatedGuard] },
  { path: 'verify-mail', component: VerifyMailComponent, canActivate: [SecureAuthenticatedGuard] },
  { path: 'select-profile', component: SelectProfileComponent, canActivate: [AuthGuard, SecureProfiledGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
