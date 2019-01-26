import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { BlokhomePage } from './blokhome';

@NgModule({
  declarations: [
    BlokhomePage,
  ],
  imports: [
    IonicPageModule.forChild(BlokhomePage),
    SuperTabsModule.forRoot()
  ],
  exports: [
    BlokhomePage
  ]
})
export class BlokhomePageModule {}
