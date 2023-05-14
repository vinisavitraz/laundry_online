import { NgModule } from '@angular/core';
import { OnlyNumbersDirective } from './directives';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    OnlyNumbersDirective,
    NavbarComponent
  ],
  exports: [
    OnlyNumbersDirective,
    NavbarComponent
  ],
  imports: []
})
export class CommonsModule { }
