import { Alternative } from './alternative';
import { Type } from './type';
import { Category } from "./category";

export class Question {

    private _id:number;
    private _description:string;
    private _categories: Array<Category>;
    private _alternatives: Array<Alternative>;
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

	public get categories(): Array<Category> {
		return this._categories;
	}

	public set categories(value: Array<Category>) {
		this._categories = value;
	}

	public get alternatives(): Array<Alternative> {
		return this._alternatives;
	}

	public set alternatives(value: Array<Alternative>) {
		this._alternatives = value;
	}

	public get type(): Type {
		return this._type;
	}

	public set type(value: Type) {
		this._type = value;
	}
    
}