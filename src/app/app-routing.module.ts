import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { UpdateCategoriesComponent } from './pages/categories/update-categories/update-categories.component';
import { ResetPassEmailComponent } from './pages/user/reset-password/reset-pass-email/reset-pass-email.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { CreateCategoriesComponent } from './pages/categories/create-categories/create-categories.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { EditStoresComponent } from './pages/stores/edit-stores/edit-stores.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import { UpdateProfileComponent } from './pages/user/update-profile/update-profile.component';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './pages/stores/stores.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateStoresComponent } from './pages/stores/create-stores/create-stores.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/user/reset-password/reset-password.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { AuthGuard } from './guards/connected/auth.guard';
import { NotConnectedGuard } from './guards/not-connected/not-connected.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user/reset-password',
    component: ResetPassEmailComponent,
  },

  {
    path: 'api/users/password/reset/:uidb64/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [NotConnectedGuard],
  },
  {
    path: 'email/verify',
    component: RegistrationComponent,
  },
  {
    path: 'update',
    component: UpdateProfileComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  { path: 'products', component: ProductsComponent },
  { path: 'addproduct', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'update-product/:id', component: UpdateProductComponent, canActivate: [AuthGuard] },
  { path: 'product-detail/:id/:indexPhoto', component: ProductDetailComponent },
  { path: 'list-store', component: StoresComponent },
  { path: 'updatestore/:id', component: EditStoresComponent, canActivate: [AuthGuard] },
  { path: 'create-store', component: CreateStoresComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category', component: CategoryPageComponent },
  { path: 'update-categories/:id', component: UpdateCategoriesComponent },
  { path: 'create-categories', component: CreateCategoriesComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
