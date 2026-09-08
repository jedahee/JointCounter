import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLargeComponent } from './header-large/header-large.component';
import { HeaderSmallComponent } from './header-small/header-small.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HeaderLargeComponent,
    HeaderSmallComponent,
    NavigationComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    TranslatePipe
  ],
  exports:[
    HeaderLargeComponent,
    HeaderSmallComponent,
    NavigationComponent,
    SpinnerComponent,
    TranslatePipe
  ]
})
export class SharedModule { }
