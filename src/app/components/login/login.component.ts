import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username!: String;
  password!: String;

  constructor(private router: Router, private authenticationService: AuthentificationService) { }
  
  onSubmitForm(form: NgForm) {
    this.authenticationService.login(form.value).subscribe(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username',form.value.username);
      this.authenticationService.setUser(form.value.username);
      this.router.navigateByUrl('/home');
    });

  }

  goToRegister() : void {
    this.router.navigateByUrl('register');
  }
}
