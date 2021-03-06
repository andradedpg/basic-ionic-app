import {IonicPage,  NavController,  NavParams,  Slides} from 'ionic-angular';
import { ModalController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ContratoProvider } from './../../../providers/contrato/contrato.provider';
import { EnderecoProvider } from '../../../providers/endereco/endereco.provider';

import { Contrato } from './../../../domain/contrato';
import { Evento } from '../../../domain/evento';

import { ContratosPage } from './../contratos';
import { ContratoValidate } from './../contratos.validate';
import { ParticipacaoPage } from '../../participacao/participacao';

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
  public evento_aberto: Evento;

  public loaded: boolean = false;
  private form : FormGroup;
  @ViewChild(Slides) slides: Slides;  

  contratoId: any;
  title:string;
  titleIcon: string;

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
      
      if(this.getEventoAberto()){
        this.contratoId = this.navParams.get('id');          
        this.setForm();

        if(this.contratoId !== undefined && this.contratoId > 0){
          this.title = 'Editar Contrato';
          this.titleIcon = "create";
          this.getData(this.contratoId);
          
          this.form.controls["local_cadastro"].setValidators(null);
          this.form.controls["como_conheceu"].setValidators(null);
          
          this.form.updateValueAndValidity();
        }else{
          this.title = 'Novo Contrato';
          this.titleIcon = "person-add";
        }

        this.loaded = true;
      }else{
        this.loaded = false;
      }          
      
  }

  ionViewDidLoad() {

  }

  submitForm(){
    this.contrato = this.formatData();

    let loading = this._loadingController.create({ content: 'Salvando Contrato...' });
    //let self = this;
    let toast = this.toastCtrl.create({ duration: 1500 });
    loading.present();

    this.contratoProvider.save(this.contrato).then((success) => {
      loading.dismiss();
      this.acaoPosSalvar(success);    
    }).catch((error) => {
      toast.setMessage('Erro no formulário : ' + error);
      toast.present();
      loading.dismiss();
    });
  }

  getEndereco(event){
    let cep = this.form.controls['cep'].value;
    if(cep.length === 8){
      let loading = this._loadingController.create({ content: 'Procurando endereço...' });
      loading.present();

      this.enderecoProvider.getByCEP(cep)
                           .subscribe(endereco => {
                             let infoEndereco = endereco.bairro+'\n'+endereco.localidade+'/'+endereco.uf;
                             
                             this.form.controls['infoEndereco'].setValue(infoEndereco);
                             this.form.controls['endereco'].setValue(endereco.logradouro);

                             loading.dismiss(); 
                           })
    }
  }

  formatField(tipo:string, field:string){
    if(field) return this.contratoValidate.define(tipo, field);
    return field;
  }

  /* Privates  */
  private getData(id:number){
    let loading = this._loadingController.create({ content: 'Carregando Contrato...' });
    loading.present();

    this.contratoProvider.getById(this.contratoId)
                          .subscribe(res => {
                            let contrato = res;
                            
                            this.form.controls['nomeTitular'].setValue(contrato.nomeTitular);
                            this.form.controls['numero'].setValue(contrato.numero);
                            this.form.controls['cpf_cnpj_titular'].setValue(contrato.cpf_cnpj_titular);
                            this.form.controls['numeroMedidor'].setValue(contrato.numeroMedidor);
                            this.form.controls['tensao'].setValue(contrato.tensao);
                            this.form.controls['cep'].setValue(contrato.cep);
                            this.form.controls['endereco'].setValue(contrato.endereco);
                            this.form.controls['numeroEndereco'].setValue(contrato.numeroEndereco);
                            this.form.controls['complementoEndereco'].setValue(contrato.complementoEndereco);

                            loading.dismiss();
                          });
  }

  private setForm(){
    
    this.form = this.formBuilder.group({
      nomeTitular: ['', Validators.required],
      numero: ['', Validators.required],
      cpf_cnpj_titular: [''],
      numeroMedidor: [''],
      tensao: [''],
      cep: [''],
      infoEndereco:  new FormControl({value: '', disabled: true}),
      endereco: [''],
      numeroEndereco: [''],
      complementoEndereco: [''],
      local_cadastro: new FormControl({value: this.evento_aberto.local.nome, disabled: true}, Validators.required),
      como_conheceu: ['', Validators.required]
    });
  }
  
  private formatData():Contrato{
    let contrato: Contrato               = this.form.value;
        contrato.cpf_cnpj_titular        = this.form.value.cpf_cnpj_titular.replace(/\./g, '').replace(/-/g, ''),
        contrato.status                  = 'A';
        
    if(this.contratoId !== undefined && this.contratoId > 0) {
      contrato.id = this.contratoId;
    }else{
    let cliente: any =     {nome:this.form.value.nomeTitular,
                            cpf:contrato.cpf_cnpj_titular,
                            evento_id:this.evento_aberto.id,
                            como_conheceu:this.form.value.como_conheceu};      
      contrato.cliente = cliente;
    }
                      
    return contrato;
  }

  private getEventoAberto():any{
    if(localStorage.getItem('evento_aberto')){
      this.evento_aberto = JSON.parse(localStorage.getItem('evento_aberto'));
      return true;
    }else{
      let toast = this.toastCtrl.create({ duration: 1500 });
      let self = this;
      toast.setMessage('Selecione um evento antes de continuar!');
      toast.present();
      toast.onDidDismiss(() => {
        self.navCtrl.setRoot('HomePage');
      });
      return false;
    }
  }

  private acaoPosSalvar(result:any) {
    let msg = (this.contratoId === undefined) ? 'Contrato Cadastrado!' : 'Contrato Editado!';
    let alert = this.alertCtrl.create({
      title: msg,
      subTitle: 'Ir direto para Reciclagem de '+result.nomeTitular+' ? ',
      buttons: [
        {
          text: 'Voltar para Contratos',
          role: 'voltar',
          handler: () => {
              this.navCtrl.push(ContratosPage, {});
          }
        },
        {
          text: 'SIM',
          handler: () => {
            this.navCtrl.push(ParticipacaoPage, {
              'id':result.id
          });
          }
        }
      ]
    });
    alert.present();
  }

  slideNext(){
    this.slides.slideNext();
  }

  slidePrev(){
    this.slides.slidePrev();
  }

}