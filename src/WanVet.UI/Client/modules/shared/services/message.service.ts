//based on https://github.com/ng-book/angular2-rxjs-chat/blob/master/app/ts/services/MessagesService.ts
import { User } from "../models/user.model";
import { Message } from "../models/message.model";
import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';

let initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
    (messages: Message[]): Message[];
}

@Injectable()
export class MessageService {
    private messagesList: Message[] = [];
    // a stream that publishes new messages only once
    newMessages: Subject<Message> = new Subject<Message>();

    // `messages` is a stream that emits an array of the most up to date messages
    messages: ReplaySubject<Message[]> = new ReplaySubject<Message[]>(1);

    // `updates` receives _operations_ to be applied to our `messages`
    // it's a way we can perform changes on *all* messages (that are currently
    // stored in `messages`)
    updates: Subject<any> = new Subject<any>();

    // action streams
    create: Subject<Message> = new Subject<Message>();

    constructor() {
        this.updates.subscribe((ope) => {
            this.messagesList = ope(this.messagesList);
            this.messages.next(this.messagesList);
        });

        this.newMessages
            .map((message: Message): IMessagesOperation => (messages: Message[]) => {
                return messages.concat(message);
            })
            .subscribe(this.updates);

    }

    // an imperative function call to this action stream
    addMessage(message: Message): void {
        this.newMessages.next(message);
    }

}
