import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLargeComponent } from './header-large/header-large.component';
import { HeaderSmallComponent } from './header-small/header-small.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderLargeComponent,
    HeaderSmallComponent,
    NavigationComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderLargeComponent,
    HeaderSmallComponent,
    NavigationComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
