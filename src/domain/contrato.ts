import { Cliente } from './cliente'; 
export class Contrato {
    
    private _id:number;
    private _status:string;
    private _titular:string;
    
    private _numero:number;
    private _medidor:string;
    private _cpf_cnpj_titular:string;
    private _tensao:string;
    private _cep:number;
    private _bairro_id:number;
    private _endereco:string;
    private _endereco_nr:string;

    private _cliente: Cliente;
    
    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }
    /**
     * Getter status
     * @return {string}
     */
	public get status(): string {
		return this._status;
	}

    /**
     * Setter status
     * @param {string} value
     */
	public set status(value: string) {
		this._status = value;
	}

    /**
     * Getter titular
     * @return {string}
     */
    public get titular(): string {
      return this._titular;
    }


    /**
     * Getter numero
     * @return {number}
     */
	public get numero(): number {
		return this._numero;
	}

    /**
     * Setter numero
     * @param {number} value
     */
	public set numero(value: number) {
		this._numero = value;
	}

    /**
     * Getter medidor
     * @return {string}
     */
	public get medidor(): string {
		return this._medidor;
	}

    /**
     * Setter medidor
     * @param {string} value
     */
	public set medidor(value: string) {
		this._medidor = value;
	}
    /**
     * Setter titular
     * @param {string} value
     */
    public set titular(value: string) {
      this._titular = value;
    }
    

    /**
     * Getter cpf_cnpj
     * @return {string}
     */
	public get cpf_cnpj_titular(): string {
		return this._cpf_cnpj_titular;
	}

    /**
     * Setter cpf_cnpj
     * @param {string} value
     */
	public set cpf_cnpj_titular(value: string) {
		this._cpf_cnpj_titular = value;
	}

    /**
     * Getter tensao
     * @return {string}
     */
	public get tensao(): string {
		return this._tensao;
	}

    /**
     * Setter tensao
     * @param {string} value
     */
	public set tensao(value: string) {
		this._tensao = value;
	}

    /**
     * Getter cep
     * @return {number}
     */
	public get cep(): number {
		return this._cep;
	}

    /**
     * Setter cep
     * @param {number} value
     */
	public set cep(value: number) {
		this._cep = value;
	}

    /**
     * Getter bairro_id
     * @return {number}
     */
	public get bairro_id(): number {
		return this._bairro_id;
	}

    /**
     * Setter bairro_id
     * @param {number} value
     */
	public set bairro_id(value: number) {
		this._bairro_id = value;
	}

    /**
     * Getter endereco
     * @return {string}
     */
	public get endereco(): string {
		return this._endereco;
	}

    /**
     * Setter endereco
     * @param {string} value
     */
	public set endereco(value: string) {
		this._endereco = value;
	}

    /**
     * Getter endereco_nr
     * @return {string}
     */
	public get endereco_nr(): string {
		return this._endereco_nr;
	}

    /**
     * Setter endereco_nr
     * @param {string} value
     */
	public set endereco_nr(value: string) {
		this._endereco_nr = value;
	}

    /**
     * Getter $cliente
     * @return {Cliente}
     */
	public get cliente(): Cliente {
		return this._cliente;
	}

    /**
     * Setter $cliente
     * @param {Cliente} value
     */
	public set cliente(value: Cliente) {
		this._cliente = value;
	}
    //...
}   