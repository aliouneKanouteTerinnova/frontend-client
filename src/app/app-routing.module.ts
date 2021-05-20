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

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'update',
    component: UpdateProfileComponent,
  },
  { path: 'products', component: ProductsComponent },
  { path: 'addproduct', component: CreateProductComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'list-store', component: StoresComponent },
  { path: 'updatestore/:id', component: EditStoresComponent },
  { path: 'create-store', component: CreateStoresComponent },
  { path: 'categories', component: CategoriesComponent },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
