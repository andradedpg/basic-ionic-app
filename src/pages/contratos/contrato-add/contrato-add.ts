import { ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { HttpService } from './../../../providers/http-service';

import { ContratoProvider } from './../../../providers/contrato/contrato.provider';
import { Contrato } from './../../../domain/contrato';

@Component({
  selector: 'contrato-add',
  templateUrl: 'contrato-add.html'
})
export class ContratoAddPage {
  public contrato: Contrato;
  
  public loaded: boolean = false;
  private form : FormGroup;

  constructor(public modalCtrl: ModalController,
              public http: HttpService,
              private contratoProvider: ContratoProvider,
              private formBuilder: FormBuilder) {

      this.form = this.formBuilder.group({
        titular: ['', Validators.required],
        numero: ['', Validators.required],
        cpf_cnpj: [''],
        medidor: [''],
        tensao: [''],
        cep: [''],
        endereco: [''],
        local_cadastro: [this.getLocalCadastro(), Validators.required],
        como_conheceu: ['', Validators.required]
      });     
  }

  ionViewDidLoad() {

  }

  FormContrato(){
    console.log(this.contrato);  
  }

  getLocalCadastro(){
    return 'LOCAL_DO_EVENTO_ABERTO';
  }

  /*  */
  private formatData(){

  }


}