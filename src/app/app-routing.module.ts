import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { CreateCategoriesComponent } from './pages/categories/create-categories/create-categories.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { EditStoresComponent } from './pages/stores/edit-stores/edit-stores.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './pages/stores/stores.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateStoresComponent } from './pages/stores/create-stores/create-stores.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './components/cart/cart.component';

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
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'email/verify',
    component: RegistrationComponent,
  },
  {
    path: 'update',
    component: UpdateProfileComponent,
  },
  { path: 'products', component: ProductsComponent },
  { path: 'addproduct', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'update-product/:id', component: UpdateProductComponent, canActivate: [AuthGuard] },
  { path: 'product-detail/:id/:indexPhoto', component: ProductDetailComponent },
  { path: 'list-store', component: StoresComponent },
  { path: 'updatestore/:id', component: EditStoresComponent, canActivate: [AuthGuard] },
  { path: 'create-store', component: CreateStoresComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent },
  { path: 'create-categories', component: CreateCategoriesComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
