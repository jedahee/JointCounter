import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UpdateCurrencyComponent } from './pages/update-currency/update-currency.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminStatsComponent } from './pages/admin-stats/admin-stats.component';

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
  {
    path: "admin/currency",
    component: UpdateCurrencyComponent,
    data: {animation: 'isUpdateCurrency'}
  },
  {
    path: "admin/home",
    component: AdminHomeComponent,
    data: {animation: 'isHome'}
  },
  {
    path: "admin/analytics",
    component: AdminStatsComponent,
    data: {animation: 'isAnalytics'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
