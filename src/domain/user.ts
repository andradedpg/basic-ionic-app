export class User {

    private _id:number;
    private _nome:string;
    private _nivel:string;
    
    public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get nome(): string {
		return this._nome;
	}

	public set nome(value: string) {
		this._nome = value;
    }
    
    public get nivel(): string {
		return this._nivel;
	}

	public set nivel(value: string) {
		this._nivel = value;
	}
}