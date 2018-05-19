import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ContratoProvider } from './../../../providers/contrato/contrato.provider';
import { EnderecoProvider } from '../../../providers/endereco/endereco.provider';

import { Contrato } from './../../../domain/contrato';
import { Cliente } from './../../../domain/cliente';
import { ContratosPage } from './../contratos';
import { ContratoValidate } from './../contratos.validate';


@IonicPage({
  name: 'contrato-form',
  segment: 'contrato-form/:id'
})

@Component({
  selector: 'contrato-form',
  templateUrl: 'contrato-form.html'
})
export class ContratoFormPage {
  public contrato: Contrato;
  
  public loaded: boolean = false;
  private form : FormGroup;

  contratoId: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,

              public modalCtrl: ModalController,
              public toastCtrl: ToastController, 
              private alertCtrl: AlertController,
              public _loadingController: LoadingController,
              
              private contratoProvider: ContratoProvider,
              private enderecoProvider: EnderecoProvider,
              private formBuilder: FormBuilder,
              public contratoValidate: ContratoValidate) {

      this.contratoId = this.navParams.get('id');          
      this.setForm();

      if(this.contratoId !== undefined && this.contratoId > 0){
        this.getData(this.contratoId);
      }
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
      this.acaoPosCadastro(toast);
      /*
      toast.setMessage('Contrato salvo corretamente!');
      toast.present();
      toast.onDidDismiss(() => {
        this.navCtrl.setRoot(ContratosPage)
      });
      */
    
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

  formatField(tipo:string, field:string){
    return this.contratoValidate.define(tipo, field);
  }

  buscarEndereco(event){
    console.log(this.form);
  }

  /*  */
  private getData(id:number){
    let loading = this._loadingController.create({ content: 'Dados do Contrato...' });
    let toast   = this.toastCtrl.create({ duration: 1500 });
    
    this.contratoProvider.getById(this.contratoId)
                          .subscribe(res => {
                            let contrato = res;
                            
                            this.form.controls['nomeTitular'].setValue(contrato.nomeTitular);
                            this.form.controls['numero'].setValue(contrato.numero);
                            this.form.controls['cpf_cnpj'].setValue(contrato.cpf_cnpj_titular);
                            this.form.controls['medidor'].setValue(contrato.numeroMedidor);
                            this.form.controls['tensao'].setValue(contrato.tensao);
                            this.form.controls['cep'].setValue(contrato.cep);
                            this.form.controls['endereco'].setValue('ANALISAR');
                            
                            if(contrato.cliente !== null) this.form.controls['como_conheceu'].setValue(contrato.cliente.como_conheceu);

                            loading.dismiss();
                            toast.onDidDismiss(() => {});
                          });
  }

  private setForm(){
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
  
  private formatData():Contrato{
    let contrato: Contrato               = this.form.value;
        contrato.cpf_cnpj_titular        = this.form.value.cpf_cnpj.replace(/[-,.]/ig, ''),         
        contrato.status                  = 'A';
    
    let cliente: any =     {nome:this.form.value.nomeTitular,
                            cpf:this.form.value.cpf_cnpj,
                            evento_id:this.getEventoAberto().id,
                            como_conheceu:this.form.value.como_conheceu};      

    contrato.cliente = cliente;
    if(this.contratoId !== undefined && this.contratoId > 0) contrato.id = this.contratoId;
                            
    return contrato;
  }

  private acaoPosCadastro(toast) {
    let alert = this.alertCtrl.create({
      title: 'Contrato Cadastrado!',
      subTitle: 'Ir direto para Reciclagem de '+this.form.value.nomeTitular+' ? ',
      buttons: [
        {
          text: 'Voltar para Contratos',
          role: 'voltar',
          handler: () => {
            toast.onDidDismiss(() => {this.navCtrl.setRoot(ContratosPage)});
          }
        },
        {
          text: 'SIM',
          handler: () => {
            // Quando a pagina de Reciclagem existir, informar ela aqui
            console.log('Ir Para reciclagem');
          }
        }
      ]
    });
    alert.present();
  }

}