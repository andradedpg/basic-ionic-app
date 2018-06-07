import { Cliente } from "./cliente";
import { Evento } from "./evento";
import { Contrato } from "./contrato";
import { Modulo } from "./modulo";

export class Participacao {
    public id;
    public cliente: Cliente;
    public evento: Evento;
    public contrato: Contrato;
    public modulo: Modulo;
    
}