import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              private modalService:ModalService,
              private acRoute:ActivatedRoute
              ) { }
            

  newUser = new BehaviorSubject<User>(null!);
  //errorSub = new Subject<string>();// FaceBook Sign in and Sign Out //////////////////////////////////////////////////////////////

/// Sign up ///////////////////////////////////////////////////////////////////////////////////

  userSignup(
    form:{
      fullName,
      userName,
      email,
      password,
      type,
      phone,
      userAddress?,
  }
  ) {
        //debugger
      //  console.log(form)
        let submittedForm = {
          fullName:form.fullName,
          userName:form.userName,
          email:form.email,
          password:form.password,
          type:form.type,
          phone:form.phone,
      }
      if(form.userAddress){
          submittedForm['address']= form.userAddress
      }

  
      return this.http
        .post (environment.SERVER_URL +'signup', submittedForm,
        {headers:{'Content-Type': 'application/json'} }
        ,
        )
        .pipe( 
          //catchError(this.handleError),
          tap((resData:any) => {
            if(resData && resData.user){
                let credentials = {
                  userName:submittedForm.userName,
                  password:submittedForm.password
                }
                 this.login(credentials).subscribe()
            }
         
          },err=>{
            this.toast.error('Server error!')
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
          
        },err=>{
          this.toast.error('Server Error Occured!')
        })
      );
  }

  autoLogin() {
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
       // this.router.navigate(['/admin/'],{ relativeTo: this.acRoute })
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

socialSignup(
  form:{
    first_name,
    last_name,
    email,
    name,
    social_id,
    provider,
}
) {
      //debugger
    //  console.log(form)
      let submittedForm = {
        first_name:form.first_name,
        last_name:form.last_name,
        email:form.email,
        name:form.name,
        id:form.social_id,
        provider:form.provider,
    }

    return this.http
      .post (environment.SERVER_URL +'socialsignup', submittedForm,
      {headers:{'Content-Type': 'application/json'} }
      ,
      )
      .pipe( 
        //catchError(this.handleError),
        tap((resData:any) => {
            if(resData && resData.user){
              this.isLoggedIn = true;
              this.handleUserAuth(
                resData.user,
                resData.user.token
              );
            }else if (resData && resData.message == 'invalid Data'){
              if(submittedForm.provider == 'FACEBOOK'){
                this.toast.error('This email address is attached with google, Please login with Google instead!')
              }else if (submittedForm.provider == 'GOOGLE'){
                this.toast.error('This email address is attached with Facebook, Please login with Facebook instead!')
              }
              
            }else if (resData && resData.message == 'go to login'){
              this.toast.error('This email address isn\'t attached with facebook or google, Please use the login button')
            }
          
          // if(resData && resData.user){
          //     let credentials = {
          //       userName:submittedForm.userName,
          //       password:submittedForm.password
          //     }
          //      this.login(credentials).subscribe()
          // }
       
        },err=>{
          this.toast.error('Server error!')
        })
      );
}

  






}
 