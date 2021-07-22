/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UpdateCategoriesComponent } from './pages/categories/update-categories/update-categories.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { CookieService } from 'ngx-cookie-service';
import { UpdateProfileComponent } from './pages/user/update-profile/update-profile.component';
// @NgModule({
//   declarations: [AppComponent, ],

import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './pages/products/products.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { StoresComponent } from './pages/stores/list-store/stores.component';
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
import { ProfileComponent } from './pages/user/profile/profile.component';
import { OrderListComponent } from './pages/order/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/order/order-details/order-details.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';

import { StripeModule } from 'stripe-angular';
import { ConditionUsedComponent } from './pages/user/condition-used/condition-used.component';
import { SellerOrderComponent } from './pages/order/seller-order/seller-order.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import { ProductResultComponent } from './pages/products/product-result/product-result.component';
import { SearchComponent } from './components/shared/search/search.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { FilterPricePipe } from './pipes/filter-price.pipe';
import { FilterMinMaxPricePipe } from './pipes/filter-min-max-price.pipe';
import { StoreProductsComponent } from './pages/stores/store-products/store-products.component';
import { NgxPaginationModule } from 'ngx-pagination';

export function rootLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    ProfileComponent,
    OrderListComponent,
    OrderDetailsComponent,
    ConditionUsedComponent,
    SellerOrderComponent,
    SearchBarComponent,
    ProductResultComponent,
    SearchComponent,
    WishlistComponent,
    FilterPricePipe,
    FilterMinMaxPricePipe,
    StoreProductsComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StripeModule.forRoot(
      'pk_test_51HQ3ZXFunRLoLWctiy0l6VVOeflU8ES2IRjTyY7LL9rEpKedBIfOfKB1BSSftQk4Qmke8HdtRcdmje7R2whuWgTz00U7HXpwjn'
    ),
  ],
  providers: [CookieService],

  bootstrap: [AppComponent],
})
export class AppModule {}
