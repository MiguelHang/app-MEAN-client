import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { User } from './models/user';
import { UserService } from './services/user.services';
import  { GLOBAL } from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'Music app';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public onSubmit(){
    // console.log(this.user)
    //get user data
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response;
        this.identity = identity;

        if(!this.identity._id){
          alert("el Usuario no etá correctamente identificado");
        }else{
          //Crear  elemento en el locaStorage
          localStorage.setItem('identity', JSON.stringify(identity));

          //get tokenUser
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if(this.token.length <= 0){
                alert("el token no se ha generado");
              }else{
                //Crear  elemento en el locaStorage para tener el token
                localStorage.setItem('token', token);
                this.user = new User('','','','','','ROLE_USER','');
              }
            },
            error => {
              let errorMessage = <any>error;

              if(errorMessage != null){
                let body = JSON.parse(error._body)
                this.errorMessage = body.message;
                console.log(error);
              }
            }
          );
        }
      },
      error => {
        let errorMessage = <any>error;

        if(errorMessage != null){
          let body = JSON.parse(error._body)
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }

  onSubmitRegister(){
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;

        if(!user._id){
          this.alertRegister = 'error al registrarse';
        }else{
          this.alertRegister = 'El registro se ha relizado correctamente, inicia sesión con '+ this.user_register.email;
          this.user_register = new User('','','','','','ROLE_USER','');
        }
      },
      error => {
        let errorMessage = <any>error;

        if(errorMessage != null){
          let body = JSON.parse(error._body)
          this.alertRegister = body.message;
          console.log(error);
        }
      }
    );
  }
}
