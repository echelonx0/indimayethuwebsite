import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


 import { map } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return  this.authService.appUser$.pipe(map((user: AppUser) => {
      if (user && user.isPartner) {
        return true;
      }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }));
  };
  }
  