import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage'
/**
 * Generated class for the SignaurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-signaure',
  templateUrl: 'signaure.html',
})
export class SignaurePage {
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;
  public signaturePadOptions : Object = {
    'minWidth': 1,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage : string;
  constructor(public toastCtrl: ToastController, public storage: Storage,public navCtrl: NavController, public navParams: NavParams,public renderer: Renderer, public viewCtrl: ViewController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-popup', true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignaurePage');
    this.signaturePad.clear();
    this.canvasResize();
  }


  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }


  drawCancel() {
    this.navCtrl.pop();
  }

   drawComplete() 
   {
      this.signatureImage = this.signaturePad.toDataURL();
    //  this.navCtrl.push(HomePage, {signatureImage: this.signatureImage});
    this.storage.set('savedSignature', this.signatureImage);
    this.signaturePad.clear();
    
    let toast = this.toastCtrl.create({
      message: 'New Signature saved.',
      duration: 3000
    });
    toast.present();
    this.viewCtrl.dismiss(this.signatureImage);
  }

  drawClear() {
    this.signaturePad.clear();
  }

}
