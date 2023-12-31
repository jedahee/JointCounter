import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UpdateCurrencyComponent } from './pages/update-currency/update-currency.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminStatsComponent } from './pages/admin-stats/admin-stats.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { AdminStatsDetailedComponent } from './pages/admin-stats-detailed/admin-stats-detailed.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

// Function for allow i18n
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    SignInComponent,
    SignUpComponent,
    UpdateCurrencyComponent,
    AdminHomeComponent,
    AdminStatsComponent,
    AdminProfileComponent,
    AdminStatsDetailedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({ // For translate
      loader: { 
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ // Intercept requests
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
