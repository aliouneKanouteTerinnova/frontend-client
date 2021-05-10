import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
