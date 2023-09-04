import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: "",
    component: PresentationComponent,
    data: {animation: 'isPresentation'}
  },
  {
    path: "sign-in",
    component: SignInComponent,
    data: {animation: 'isSignIn'}
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    data: {animation: 'isSignUp'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
