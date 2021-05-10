import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './pages/registration/registration.component';

@NgModule({
  declarations: [AppComponent, RegistrationComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, TranslateModule.forRoot(), SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
