import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../_services/chat.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatMessage: string= '';
  allMessages: any[] = []
  constructor(private chatService: ChatService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.allMessages = []
  }

  sendMEssage() {
    this.allMessages.push({myMessage: this.chatMessage})
    this.chatService.sendMessageToBot(this.chatMessage).subscribe((data: any)=>{
      console.log(data)
    })
  }
}
