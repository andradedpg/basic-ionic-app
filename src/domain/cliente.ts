export class Cliente{
    private _id:number;
    private _nome:string;
    private _cpf:number;
    private _como_conheceu:string;
    private _evento_id:number;
    
    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Getter nome
     * @return {string}
     */
	public get nome(): string {
		return this._nome;
	}

    /**
     * Setter nome
     * @param {string} value
     */
	public set nome(value: string) {
		this._nome = value;
	}

    /**
     * Getter cpf
     * @return {number}
     */
	public get cpf(): number {
		return this._cpf;
	}

    /**
     * Setter cpf
     * @param {number} value
     */
	public set cpf(value: number) {
		this._cpf = value;
    }
    
    /**
     * Getter como_conheceu
     * @return {string}
     */
	public get como_conheceu(): string {
		return this._como_conheceu;
	}

    /**
     * Setter como_conheceu
     * @param {string} value
     */
	public set como_conheceu(value: string) {
		this._como_conheceu = value;
	}

    /**
     * Getter evento_id
     * @return {number}
     */
	public get evento_id(): number {
		return this._evento_id;
	}

    /**
     * Setter evento_id
     * @param {number} value
     */
	public set evento_id(value: number) {
		this._evento_id = value;
	}
    


}