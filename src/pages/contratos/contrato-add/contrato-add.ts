import { NavController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ContratoProvider } from './../../../providers/contrato/contrato.provider';
import { Contrato } from './../../../domain/contrato';
import { Cliente } from './../../../domain/cliente';
import { ContratosPage } from './../contratos';

@Component({
  selector: 'contrato-add',
  templateUrl: 'contrato-add.html'
})
export class ContratoAddPage {
  public contrato: Contrato;
  
  public loaded: boolean = false;
  private form : FormGroup;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController, 
              public _loadingController: LoadingController,
              private contratoProvider: ContratoProvider,
              private formBuilder: FormBuilder) {

      this.form = this.formBuilder.group({
        nomeTitular: ['', Validators.required],
        numero: ['', Validators.required],
        cpf_cnpj: [''],
        medidor: [''],
        tensao: [''],
        cep: [''],
        endereco: [''],
        local_cadastro: [this.getEventoAberto().local, Validators.required],
        como_conheceu: ['', Validators.required]
      });     
  }

  ionViewDidLoad() {

  }

  FormContrato(){
    this.contrato = this.formatData();

    let loading = this._loadingController.create({ content: 'Salvando Contrato...' });
    let self = this;
    let toast = this.toastCtrl.create({ duration: 1500 });

    loading.present();

    this.contratoProvider.save(this.contrato).then((success) => {
      loading.dismiss();
      toast.setMessage('Logado! Carregando ambiente...');
      toast.present();
      toast.onDidDismiss(() => {
        this.navCtrl.setRoot(ContratosPage)
      });
    
    }).catch((error) => {
      console.log(error);
      toast.setMessage('Erro no formulário : ' + error);
      toast.present();
      loading.dismiss();
    });
  }

  getEventoAberto():any{
    return {id:2, local:'LOCAL_DO_EVENTO_ABERTO'};
  }

  /*  */
  private formatData():Contrato{
    let contrato: Contrato               = this.form.value;
        contrato.status                  = 'A';
        contrato.$cliente                = new Cliente();
        contrato.$cliente.nome           = this.form.value.titular;
        contrato.$cliente.cpf            = this.form.value.cpf_cnpj;
        contrato.$cliente.evento_id      = this.getEventoAberto().id;
        contrato.$cliente.como_conheceu  = this.form.value.como_conheceu;
    return contrato;
  }


}