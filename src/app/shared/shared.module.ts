import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLargeComponent } from './header-large/header-large.component';
import { HeaderSmallComponent } from './header-small/header-small.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    HeaderLargeComponent,
    HeaderSmallComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderLargeComponent,
    HeaderSmallComponent,
    NavigationComponent
  ]
})
export class SharedModule { }
