import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent }  from './login/login.component.ts';
import { SignupComponent }  from './signup/signup.component.ts';
import { UserListComponent} from './userlist/userlist.component.ts';
import { UserInfoComponent} from './userinfo/userinfo.component.ts';
import { HomeComponent} from './home/home.component.ts';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'home', component: HomeComponent},
      { 
        path: 'userlist', 
        component: UserListComponent,
        children: [
          //{ path: '', redirectTo: 'user/1', pathMatch: 'full' },
          { path: '', component: null},
          { path: 'user/:id', component: UserInfoComponent }
        ]
      },
      /*{path: 'userlist', component: UserListComponent},
      {path: 'userlist/user/:id', component: UserInfoComponent},*/
      { path: '', component: HomeComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}