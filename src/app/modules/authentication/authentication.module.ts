import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
