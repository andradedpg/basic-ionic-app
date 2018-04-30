export class Contrato {

    private _id:number;
    private _titular:string;
    private _numero:number;
    private _medidor:string;
    private _cpf_cnpj:string;
    private _tensao:string;
    private _cep:number;
    private _bairro_id:number;
    private _endereco:string;
    private _endereco_nr:string;
    
    public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
    }
    //...
}