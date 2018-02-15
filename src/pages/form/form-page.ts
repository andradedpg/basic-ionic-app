import { Alternative } from './../../domain/alternative';
import {Question} from '../../domain/question';
import { Form } from './../../domain/form';
import { HttpService } from './../../providers/http-service';
import { HttpModule, Http } from '@angular/http';
import { Component, Input } from '@angular/core';
import {IonicPage,  NavController,  NavParams} from 'ionic-angular';
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
  form: Form;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http) {
    
    this.form = new Form();
    this.getForm();
  }

  public getForm() {
    this.http.get('../assets/form.json').map(res => res.json()).subscribe(data => 
    {
      this.form = data.forms[1] as Form;
    }); 
  }

  // public buildForm(){
  //   let q: Question;
  //   for (var i = 0; i < this.form.questions.length; i++) {
  //     q = this.form.questions[i];
  //     if(q.type.id === 1){
        
  //     }
  //   }
  // }

}
