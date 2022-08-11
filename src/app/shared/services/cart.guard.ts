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
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && user.userId){
      return true;
    }else{
      return this.router.createUrlTree(['/']);
    }
  }
}
