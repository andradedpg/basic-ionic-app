import { Type } from './type';
import { Category } from "./category";

export class Alternatives {

    private _id: number;
    private _description: string;
    
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
}