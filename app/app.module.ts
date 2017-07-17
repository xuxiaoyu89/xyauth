import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { LoginComponent } from './components/login/login.component';
// services
import { UserService } from './services/user.service';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        // form: reactive form vs formsModule
        ReactiveFormsModule, 
        HttpModule
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        // HashLocationStrategy: there should be a # tag in the url
        // {provide: LocationStrategy, useClass: HashLocationStrategy}
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        UserService
    ]
})
export class AppModule {

};
