import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFavoriteTopicsComponent } from '../dialog-favorite-topics/dialog-favorite-topics.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userRegister = new FormGroup({
    username: new FormControl(
      '', [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z0-9_]{3,29}$")]
    ),
    email: new FormControl(
      '', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
    ),
    password: new FormControl(
      '', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z]).{8,}$")]
    ),
    userConfirmPassword: new FormControl(''),
    userGitHub: new FormControl(
      '',[Validators.pattern("^(https:\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$")] 
    )
  }, {validators: this.passwordConfirming})

  constructor(
    private router: Router, 
    private authenticationService: AuthentificationService,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  onSubmitForm() {
    this.authenticationService.register(this.userRegister.value).subscribe(data => {
      var username = this.userRegister.get('username')!.value;
      localStorage.setItem('token',data.token);
      localStorage.setItem('username',username!);
      localStorage.setItem('pictureUri',"../../../assets/images/user.svg");
      this.authenticationService.setUser(username!);

      const dialogRef = this.dialog.open(DialogFavoriteTopicsComponent, {
        width: '40%',
        disableClose: true
      });
      
      dialogRef.afterClosed().subscribe((result) => {
        if(result != null){
          this.userService.postFavoritesTopics(result);
        }else{
          this.userService.postFavoritesTopics(["Javascript", "Typescript", "Java"]);
        }
      })

      this.router.navigateByUrl('/home');
    });
  }

  passwordConfirming(c: AbstractControl): any {
    if (c.get('password')?.value !== c.get('userConfirmPassword')?.value) {
      return { invalid: true }
    }
  }

  goToLogin() : void {
    this.router.navigateByUrl('login');
  }

  goToHome() : void {
    this.router.navigateByUrl('home');
  }

  get usernameField(){
    return this.userRegister.get('username')
  }

  get emailField(){
    return this.userRegister.get('email')
  }

  get passwordField(){
    return this.userRegister.get('password')
  }

  get gitHubURLField(){
    return this.userRegister.get('userGitHub')
  }
}
