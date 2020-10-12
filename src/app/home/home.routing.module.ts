import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { SiginComponent } from './sigin/sigin.component';
import { SignupComponent } from './signup/signup.component';


const routes = [ 
  {  
    path: '', 
    component: HomeComponent,
    children: [
      { path: '', component: SiginComponent, data: {title: 'Sign'} },
      { path: 'signup', component: SignupComponent , data: {title: 'SignUp'}},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
