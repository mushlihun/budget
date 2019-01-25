import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ProductModalPage } from './product-modal';

@NgModule({
  declarations: [
    ProductModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductModalPage),
  ],
  exports: [
    ProductModalPage
  ]
})
export class ProductModalPageModule { }
