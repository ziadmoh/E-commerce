import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { OrderService } from './order.service';



@Injectable({ providedIn: 'root' })
export class CartGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
     ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.newUser.pipe(
      take(1),
      map(user => {
        const isAuth = (user && user.userId) ? true : false;
        if (isAuth) {
          return true;
        }else{
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}
