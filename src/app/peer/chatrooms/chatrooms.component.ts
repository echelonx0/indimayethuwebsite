import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.css']
})
export class ChatroomsComponent implements OnInit {

  allChats: any[];
  id: string;

  constructor(private dataService: ChatService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']

    this.dataService.getAllChats().subscribe(data => {
      this.allChats = data;
      console.log(this.allChats.length)
    })


  }
}
