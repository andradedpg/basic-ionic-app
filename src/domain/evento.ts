import { Acao } from "./acao";
import { Localidade } from "./localidade";

export class Evento {

    public id:number;
    public acao: Acao;
    public local: Localidade;
    public status:string;

}