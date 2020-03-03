import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SelectProfileService } from '../services/select-profile.service';

@Injectable({
  providedIn: 'root'
})
export class SelectProfileGuard implements CanActivate {

  constructor(
    public router: Router,
    public selectProfileService: SelectProfileService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.selectProfileService.getProfile) {
      this.router.navigate(['select-profile']);
    }
    return true;
  }

}
