import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { OrdersPage } from './orders';

@NgModule({
  declarations: [
    OrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
  ],
  exports: [
    OrdersPage
  ]
})
export class ProductModalPageModule { }
