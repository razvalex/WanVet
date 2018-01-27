import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';

@Component({
    selector: '.messageBox',
    templateUrl: 'message-box.component.html',
    styleUrls: ['message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
    messages: Message[];

    constructor(private messageService: MessageService) {
        this.messages = [];
    }

    public ngOnInit() {
        this.messageService.messages.subscribe((msg: Message[]) => {
            this.messages = msg;
        });
    }
}