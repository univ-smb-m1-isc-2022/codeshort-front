import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$!: Observable<String | null>;

  constructor(private router: Router, private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
      this.user$ = this.authentificationService.user$;
  }

  goToLogin() : void {
    this.router.navigateByUrl('login');
  }
}
