import { EditStoresComponent } from './pages/stores/edit-stores/edit-stores.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './pages/stores/stores.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'list-store', component: StoresComponent },
  { path: 'edit-stores/:id', component: EditStoresComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
