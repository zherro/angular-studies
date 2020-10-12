import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { SiginComponent } from './home/sigin/sigin.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SignupComponent } from './home/signup/signup.component';
import { HomeComponent } from './home/home/home.component';
import { RequiresAuthGuard } from './core/auth/requires-auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';

const routes = [ 
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
   path: 'home',
   loadChildren: './home/home.module#HomeModule' 
  },
  {
    path: 'user/:userName', component: PhotoListComponent,     
    resolve: {
      photos: PhotoListResolver
    },
    data: {
      title: 'Timeline'
    }
  },
  { 
    path: 'p/add',
    component: PhotoFormComponent,
    canActivate: [RequiresAuthGuard],
    data: {
      title: 'Photo Upload'
    }
  },
  { 
    path: 'p/:photoId',
    component: PhotoDetailsComponent,
    data: {
      title: 'Photo Detail'
    }
  },
  { 
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Not Found'
    }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
