import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CookieService } from 'ngx-cookie-service';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { TranslateModule } from '@ngx-translate/core';
// import { SharedModule } from './shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
// import { HttpClientModule } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './pages/products/products.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { StoresComponent } from './pages/stores/stores.component';
import { EditStoresComponent } from './pages/stores/edit-stores/edit-stores.component';
import { CreateStoresComponent } from './pages/stores/create-stores/create-stores.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateCategoriesComponent } from './pages/categories/create-categories/create-categories.component';
import { CartComponent } from './components/cart/cart.component';
import { UpdateCategoriesComponent } from './pages/categories/update-categories/update-categories.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    UpdateProfileComponent,
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    UpdateProductComponent,
    StoresComponent,
    EditStoresComponent,
    CreateStoresComponent,
    CreateProductComponent,
    CategoriesComponent,
    CreateCategoriesComponent,
    CartComponent,
    UpdateCategoriesComponent,
  ],

  // @NgModule({
  // declarations: [
  //   AppComponent,
  //   NavbarComponent,
  //   ProductsComponent,
  //   UpdateProductComponent,
  //   StoresComponent,
  //   EditStoresComponent,
  //   CreateStoresComponent,
  //   CreateProductComponent,
  // ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  // HttpClientModule,
  // TranslateModule.forRoot(),
  // MatButtonModule,
  // MatToolbarModule,
  // MatIconModule,
  // MatCardModule,
  // NgbModule,
  // ReactiveFormsModule,
  // FormsModule,
  // SharedModule,
  // ],
  // providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
