import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AnecdoteComponent } from './components/anecdote/anecdote.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfilComponent } from './components/profil/profil.component';
import { CreateAnecdoteComponent } from './components/create-anecdote/create-anecdote.component';
import { TokenInterceptor } from './token-interceptor';
import { ProfilCardComponent } from './components/profil-card/profil-card.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogEditProfilComponent } from './components/dialog-edit-profil/dialog-edit-profil.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AnecdoteComponent,
    LoginComponent,
    RegisterComponent,
    ProfilComponent,
    CreateAnecdoteComponent,
    ProfilCardComponent,
    CommentComponent,
    CommentItemComponent,
    DialogEditProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
