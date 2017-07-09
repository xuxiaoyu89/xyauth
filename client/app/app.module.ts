import {NgModule} from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppComponent}   from './app.component.ts';
import {AppRoutingModule} from './app.router.ts';
import {LoginComponent} from './login/login.component.ts';
import {SignupComponent} from './signup/signup.component.ts';
import {UserListComponent} from './userlist/userlist.component.ts';
import {UserInfoComponent} from './userinfo/userinfo.component.ts';
import {HomeComponent} from './home/home.component.ts';
import {FileUploaderComponent} from './file-uploader/file-uploader.component.ts';
import {ImageEditorComponent} from './image-editor/image-editor.component.ts';
import {ModalComponent} from './modal/modal.component.ts';
import {UserService} from './user.service.ts';
import {FileService} from './file.service.ts';
import {CookieService} from './cookie.service.ts';
import {ModalService} from './modal/modal.service.ts';



@NgModule({
  imports: [
  	BrowserModule, 
  	FormsModule,
  	ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [ 
  	AppComponent,
  	LoginComponent,
    SignupComponent,
    UserListComponent,
    UserInfoComponent,
    HomeComponent,
    FileUploaderComponent,
    ImageEditorComponent,
    ModalComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ModalService
  ]
})
export class AppModule { }
