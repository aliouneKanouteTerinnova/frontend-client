import { UpdateCategoriesComponent } from './pages/categories/update-categories/update-categories.component';
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
import { HeaderComponent } from './header/header.component';

import { RegistrationComponent } from './pages/user/registration/registration.component';
import { CookieService } from 'ngx-cookie-service';
import { UpdateProfileComponent } from './pages/user/update-profile/update-profile.component';
// @NgModule({
//   declarations: [AppComponent, ],

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './pages/products/products.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { StoresComponent } from './pages/stores/stores.component';
import { EditStoresComponent } from './pages/stores/edit-stores/edit-stores.component';
import { CreateStoresComponent } from './pages/stores/create-stores/create-stores.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateCategoriesComponent } from './pages/categories/create-categories/create-categories.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/user/reset-password/reset-password.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { ResetPassEmailComponent } from './pages/user/reset-password/reset-pass-email/reset-pass-email.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    UpdateProfileComponent,
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ProductsComponent,
    UpdateProductComponent,
    StoresComponent,
    EditStoresComponent,
    CreateStoresComponent,
    CreateProductComponent,
    CategoriesComponent,
    CreateCategoriesComponent,
    HomeComponent,
    ResetPasswordComponent,
    MenuComponent,
    CheckoutComponent,
    ProductDetailComponent,
    CartComponent,
    ResetPassEmailComponent,
    UpdateCategoriesComponent,
    CategoryPageComponent,
    FooterComponent,
  ],

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

  bootstrap: [AppComponent],
})
export class AppModule {}
