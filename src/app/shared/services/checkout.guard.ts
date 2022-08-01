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
export class CheckOutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private orderService:OrderService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.orderService.canCheckOut.pipe(
      take(1),
      map(canCheck => {
        if (canCheck) {
          return true;
        }else{
          return this.router.createUrlTree(['/shop/cart']);
        }
      })
    );
  }
}
