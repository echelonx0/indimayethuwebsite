import { ElementSchemaRegistry } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Moods } from "src/app/models/moods";
import { User } from "src/app/models/users";
import { AuthService } from "src/app/services/auth.service";
import { ClientServiceService } from "src/app/services/client-service.service";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-card-profile",
  templateUrl: "./card-profile.component.html",
})
export class CardProfileComponent implements OnInit {

  userID: string;
  userData: User;
  moods: number = 0;
  journalEntries: number = 0;

  constructor(private clientService: ClientServiceService, private authService: AuthService, private dataService: DataService) {}

  ngOnInit(): void {

    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.userID = auth.uid;
        this.getProfile();
        this.getMood();
        this.getJournalEntries();
      } else {
        console.log('There was an error...')
      }
    });
    this.getProfile();
  }

  getProfile (){
    // Get client
    this.clientService.getClient(this.userID).subscribe(profile => {
      if(profile != null) {
        this.userData = profile;
      } 
      this.userData = profile;
    });
  }

  getMood(){
    this.dataService.getMyMoods(this.userID).subscribe(moods => {

      if(moods != null){
        this.moods = moods.length;
      }
    });
  }

  getJournalEntries(){
    this.dataService.getJournals(this.userID).subscribe(journalEntries => {

      if(journalEntries != null){
        this.journalEntries = journalEntries.length;
      }
    });

  }
}
