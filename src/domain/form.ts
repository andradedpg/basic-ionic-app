import { Question } from './question';

export class Form {

    private _id:number;
    private _title:string;
    private _description: string;
    private _questions: Array<Question>;

	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}
    
    public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get questions(): Array<Question> {
		return this._questions;
	}

	public set questions(value: Array<Question>) {
		this._questions = value;
	}

	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}
}