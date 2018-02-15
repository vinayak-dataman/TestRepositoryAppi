import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideIntroPage } from './slide-intro';

@NgModule({
  declarations: [
    SlideIntroPage,
  ],
  imports: [
    IonicPageModule.forChild(SlideIntroPage),
  ],
})
export class SlideIntroPageModule {}
