import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiVisualiserComponent } from './components/api-visualiser/api-visualiser.component';
import { BlogComponent } from './components/blog/blog.component';
import { FromHdComponent } from './components/form-hd/form-hd.component';
import { HomeComponent } from './components/home/home.component';
import { ImagePredictionComponent } from './components/image-prediction/image-prediction.component';
import { LoginComponent } from './components/login/login.component';
import { UserWelcomeComponent } from './components/user-welcome/user-welcome.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },

  {
    path:"blog",
    component:BlogComponent
  },

  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },

  {
    path:"apis",
    component: ApiVisualiserComponent
  },

  {
    path:"user-welcome",
    component: UserWelcomeComponent
  },

  {
    path:"image",
    component: ImagePredictionComponent
  },

  {
    path:"form",
    component: FromHdComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
