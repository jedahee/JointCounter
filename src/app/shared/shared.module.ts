import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLargeComponent } from './header-large/header-large.component';
import { HeaderSmallComponent } from './header-small/header-small.component';



@NgModule({
  declarations: [
    HeaderLargeComponent,
    HeaderSmallComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderLargeComponent,
    HeaderSmallComponent
  ]
})
export class SharedModule { }
