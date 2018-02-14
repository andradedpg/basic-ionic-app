import { Alternatives } from './alternatives';
import { Type } from './type';
import { Category } from "./category";

export class Question {

    private _id:number;
    private _description:string;
    private _category: Array<Category>;
    private _alternatives: Array<Alternatives>;
    private _type:Type;

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

	public get category(): Array<Category> {
		return this._category;
	}

	public set category(value: Array<Category>) {
		this._category = value;
	}

	public get alternatives(): Array<Alternatives> {
		return this._alternatives;
	}

	public set alternatives(value: Array<Alternatives>) {
		this._alternatives = value;
	}

	public get type(): Type {
		return this._type;
	}

	public set type(value: Type) {
		this._type = value;
	}
    
}