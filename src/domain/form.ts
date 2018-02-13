import { Question } from './question';

export class Form {

    private _id:number;
    private _title:string;
    private _description: string;
    private _questions: Array<Question>;

	public get id(): number {
		return this.id;
	}
	public set id(value: number) {
		this.id = value;
	}
    
    public get title(): string {
		return this.title;
	}

	public set title(value: string) {
		this.title = value;
	}

	public get questions(): Array<Question> {
		return this.questions;
	}

	public set questions(value: Array<Question>) {
		this.questions = value;
	}

	public get description(): string {
		return this.description;
	}

	public set description(value: string) {
		this.description = value;
	}
}