import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username!: String;
  email!: String;
  password!: String;
  userConfirmPassword!: String;
  userGitHub!: String;

  constructor(private router: Router, private authenticationService: AuthentificationService) { }

  onSubmitForm(form: NgForm) {
    this.authenticationService.register(form.value).subscribe(data => {
      localStorage.setItem('token',data.token);
      this.authenticationService.setUser(form.value.username);
      this.router.navigateByUrl('/home');
    });
  }

  goToLogin() : void {
    this.router.navigateByUrl('login');
  }
}
