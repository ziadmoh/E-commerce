import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
//import { SocialAuthService,FacebookLoginProvider, GoogleLoginProvider ,SocialUser } from "angularx-social-login";
import {User} from '../models/user.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from './modal.service';

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
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient,
              private router:Router,
              private toast: ToastrService,
              private modalService:ModalService
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
  private handleUserAuth(
    user:User,
    token:string
  ) {
    const userNew :User = {
      userId : user.userId ,
      fullName :user.fullName, 
      userName:user.userName,
      email:user.email ? user.email :'',
      password:'',
      type:user.type,
      token:token,
      address:user.address,
      joinDate:user.joinDate,
      phone:user.phone
    }
    //= new User(userId,'','','','','','',false,0,'','');
    this.newUser.next(userNew);
    localStorage.setItem(
      'user', JSON.stringify(userNew)
    );

    this.closeLoginModal();

    if(userNew.type == 'admin' ){
     // this.router.navigate(['/admin']);
      window.location.reload()
    }else{
      window.location.reload()
    }
    
  }

  closeLoginModal(){
    let modal = document.querySelector('.login-modal') as HTMLElement;
    if (modal){
      this.modalService.closeLoginModal(modal);
    }
  }
  
  login(credentials) {
    return this.http
      .post(
        environment.SERVER_URL +'signin',{...credentials}
      )
      .pipe(
        tap((res:any) => {
          if(res.userInfo && res.userInfo.userId){
            this.isLoggedIn = true;
            this.handleUserAuth(
              res.userInfo,
              res.token
            );
          }else{
            this.toast.error(res.status,res.message)
          }
          
        })
      );
  }

  autoLogin() {
    debugger
    const user: User = JSON.parse(localStorage.getItem('user')!);
    if (!user) {
      return;
    }

    const loadedUser:User = {
      userId : user.userId ,
      fullName :user.fullName, 
      userName:user.userName,
      email:user.email ? user.email :'',
      password:'',
      type:user.type,
      token:user.token,
      address:user.address,
      joinDate:user.joinDate,
      phone:user.phone
    }

    if (loadedUser.token) {
      this.newUser.next(loadedUser);
      this.isLoggedIn = true;
      if(loadedUser.type == 'admin'){
        this.router.navigate(['/admin'])
      }
    }
  }

  logout() {
    this.newUser.next(null!);
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    //this.router.navigate(['/']);
    window.location.href = '/'
  }

//   autoLogout(expirationDuration: number) {
//     // this.tokenExpirationTimer = setTimeout(() => {
//     //   this.logout();
//     // }, expirationDuration);
//   }

  






}
 