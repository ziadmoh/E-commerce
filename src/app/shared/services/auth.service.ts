import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
//import { SocialAuthService,FacebookLoginProvider, GoogleLoginProvider ,SocialUser } from "angularx-social-login";
import {User} from '../models/user.model';

export interface AuthResponseData {
  error:boolean,
  message:string,
  user:User
  //User_Type:string,
  //User_Name:string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // user!: SocialUser;
  loggedIn!: boolean;
  constructor(private http: HttpClient,
              private router:Router
              ) { }
            

  newUser = new BehaviorSubject<User>(null!);
  //errorSub = new Subject<string>();// FaceBook Sign in and Sign Out //////////////////////////////////////////////////////////////

/// Sign up ///////////////////////////////////////////////////////////////////////////////////

  userSignup(userData:object) {
  
    return this.http
      .post ('http://localhost:3000/signup', {...userData},
      {headers:{'Content-Type': 'application/json'} }
      ,
      )
      .pipe( 
        //catchError(this.handleError),
        tap((resData) => {
          console.log(resData);
        //   this.handleUserAuth(
        //     resData.user,
        //     // resData.User_Token,
        //     // resData.User_Type,
        //     // resData.User_Name
        //   );
        })
      );
  }
/// Handle Auth ///////////////////////////////////////////////////////////////////////
//   private handleUserAuth(
//     user:User
//   ) {
//     const userNew :User = {
//       userId : user.userId ,
//       firstName :user.firstName, 
//       lastName: user.lastName,
//       userName:user.userName,
//       email:user.email,
//       password:user.password,
//       dateOfBirth:user.dateOfBirth,
//       gender:user.gender,
//       type:user.type,
//       profession:user.profession,
//       token:user.token,
//     }
//     //= new User(userId,'','','','','','',false,0,'','');
//     this.newUser.next(userNew);
//     localStorage.setItem(
//       'user', JSON.stringify(userNew)
//     );
//   }
  
//   login(username: string, password: string) {
//     return this.http
//       .post<AuthResponseData>(
//         'http://localhost:3000/login',
//         {
//           username: username,
//           password: password,
//         }
//       )
//       .pipe(
//         catchError(this.handleError),
//         tap(resData => {
          
//           this.loggedIn = true;
//           this.handleUserAuth(
//             resData.user
//           );
//         })
//       );
//   }

//   autoLogin() {
//     const userData: User = JSON.parse(localStorage.getItem('userData')!);
//     if (!userData) {
//       return;
//     }

//     const loadedUser:User = {
//       userId : userData.userId ,
//       firstName :userData.firstName, 
//       lastName: userData.lastName,
//       userName:userData.userName,
//       email:userData.email,
//       password:userData.password,
//       dateOfBirth:userData.dateOfBirth,
//       gender:userData.gender,
//       type:userData.type,
//       profession:userData.profession,
//       token:userData.token,
//     }

//     if (loadedUser.token) {
//       this.newUser.next(loadedUser);
//       this.loggedIn = true;
//     }
//   }

//   logout() {
//     this.newUser.next(null!);
//     this.loggedIn = false;
//     this.router.navigate(['/home']);
//     localStorage.removeItem('userData');
    
//   }

//   autoLogout(expirationDuration: number) {
//     // this.tokenExpirationTimer = setTimeout(() => {
//     //   this.logout();
//     // }, expirationDuration);
//   }

  

//   private handleError(errorRes: HttpErrorResponse) {
//     let errorMessage = 'An unknown error occurred!';
//     if (!errorRes.error || !errorRes.error.error) {
//       return throwError(errorMessage);
//     }
//     switch (errorRes.error.error.message) {
//       case 'EMAIL_EXISTS':
//         errorMessage = 'This email exists already';
//         break;
//       case 'EMAIL_NOT_FOUND':
//         errorMessage = 'This email does not exist.';
//         break;
//       case 'INVALID_PASSWORD':
//         errorMessage = 'This password is not correct.';
//         break;
//     }
//     return throwError(errorMessage);
//   }




}
 