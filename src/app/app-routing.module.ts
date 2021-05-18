import { EditStoresComponent } from './pages/stores/edit-stores/edit-stores.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './pages/stores/stores.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateStoresComponent } from './pages/stores/create-stores/create-stores.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'addproduct', component: UpdateProductComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'list-store', component: StoresComponent },
  { path: 'updatestore/:id', component: EditStoresComponent },
  { path: 'create-store', component: CreateStoresComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
