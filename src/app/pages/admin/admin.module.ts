import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';

@NgModule({
  declarations: [AdminCustomersComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
