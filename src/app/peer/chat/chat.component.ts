import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat: any[];
  id: string;

  constructor(private dataService: ChatService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']

    this.dataService.getChat(this.id).subscribe(data => {
      this.chat = data;
   
    })


  }

  reply(){

  }

}
