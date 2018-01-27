import { User } from "./user.model";

export class Message {
    public content: string;
    public title: string;
    public destination: User;
    public date: string;

    public constructor(data: any = {}) {
        this.content = data.content || "";
        this.title = data.title || "";
        this.destination = data.destination || null;
        this.date = data.date || Date.now();
    }
}
