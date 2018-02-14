export class Category {

    private _id:number;
    private _description:string;
	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}
}