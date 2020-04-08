import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './containers/admin/admin.component';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './containers/users/users.component';
import { OthersComponent } from './containers/others/others.component';

@NgModule({
  declarations: [AdminComponent, UsersComponent, OthersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
