import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'Music app';
  public user: User;
  public identity;
  public token;

  constructor(
    private _userService:UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){

  }

  public onSubmit(){
    console.log(this.user)

    this._userService.signup(this.user).subscribe(
      response => {
        console.log(response);
      },
      error => {
        let errorMessage = <any>error;

        if(errorMessage != null){
          console.log(error);
        }
      }
    );
  }
}
