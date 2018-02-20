import { Form } from './../../domain/form';
import { HttpModule, Http } from '@angular/http';
import { Component, ViewChild, Input } from '@angular/core';
import {Slides, NavController,   NavParams} from 'ionic-angular';
/**
 * Generated class for the FormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'form-page',
  templateUrl: 'form-page.html',
})

export class FormPage {
  @Input() form: Form;
  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http) {
    
    this.form = new Form();
    this.getForm();
  }

  slideNext(){
    this.slides.slideNext();
  }

  slidePrev(){
    this.slides.slidePrev();
  }

  public getForm() {
    this.http.get('../assets/form.json').map(res => res.json()).subscribe(data => 
    {
      this.form = data.forms[1] as Form;
    }); 
  }

  public teste(){
    console.log(this.form);
    
  }

}
