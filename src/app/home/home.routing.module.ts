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
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SiginComponent },
      { path: 'signup', component: SignupComponent },
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
