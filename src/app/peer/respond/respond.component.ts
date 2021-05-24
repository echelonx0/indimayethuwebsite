import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from 'src/app/services/community.service';
import firebase from 'firebase';

@Component({
  selector: 'app-respond',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.css']
})
export class RespondComponent implements OnInit {

  id: string;
  chat: any;
  sender: string = '';
  message: string;


  constructor(private dataService: CommunityService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']

    this.dataService.getChat(this.id).subscribe( data => {

      



      this.response.sender = data.sender;
      this.response.to = data.sender;
      
    })
  }

  //So here I am configuring a response object to add to a firestore document array
  //Due to the fact that different users can access this chat when it is not yet closed, 
  //we assign a global owner to the document and use it to check in the chat room

  response = {
    isResolved: false,
    timeSent: firebase.firestore.FieldValue.serverTimestamp(),
    isRead: false,
    originalMessage: '',
    owner: 'indimayethusentinel',
    sender: this.route.snapshot.params['id'],
    subject: 'New message from a Peer mentor',
    to: '',
    messages: []

  }

  async respond(){

    this.response.originalMessage = this.message;
   //Now navigate to the chatroom with the relevant document ID in tow

    //array union

    //Pass data around locally
    //this.dataService.updatedDataSelection(documentID);

    //    this.isLoading = false;
    this.router.navigate(['chatroom/{{this.id}}']);


    console.log('Done...')

  }

}
