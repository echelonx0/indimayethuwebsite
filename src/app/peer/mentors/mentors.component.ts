import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit {

  helpRequests: any[];

  constructor(private dataService: CommunityService) { }

  ngOnInit(): void {

    this.dataService.getAllMessages().subscribe(data => {
      this.helpRequests = data;
      console.log(this.helpRequests.length)
    })



   
  }

  sendBtn(){
      
  }

}
