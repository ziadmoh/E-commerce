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

import { AuthService } from './../shared/services/auth.service';
import { ModalService } from '../shared/services/modal.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private modalService:ModalService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.checkUserPermission()
  }
  checkUserPermission() {
    return this.authService.newUser.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (user && user.type == 'admin') {
          return true;
        }
        return this.router.createUrlTree(['/']);
      })
    );
  }
}
