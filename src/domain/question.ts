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
		return this.id;
	}

	public set id(value: number) {
		this.id = value;
	}

	public get description(): string {
		return this.description;
	}

	public set description(value: string) {
		this.description = value;
	}

	public get category(): Array<Category> {
		return this.category;
	}

	public set category(value: Array<Category>) {
		this.category = value;
	}

	public get alternatives(): Array<Alternatives> {
		return this.alternatives;
	}

	public set alternatives(value: Array<Alternatives>) {
		this.alternatives = value;
	}

	public get type(): Type {
		return this.type;
	}

	public set type(value: Type) {
		this.type = value;
	}
}