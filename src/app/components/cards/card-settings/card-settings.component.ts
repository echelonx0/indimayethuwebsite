import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/users";
import { AuthService } from "src/app/services/auth.service";
import { ClientServiceService } from "src/app/services/client-service.service";

@Component({
  selector: "app-card-settings",
  templateUrl: "./card-settings.component.html",
})
export class CardSettingsComponent implements OnInit {

  userID: string;
  userData: User;

  constructor(private clientService: ClientServiceService, private authService: AuthService,) {}

  ngOnInit(): void {

    //1. Get the logged in User's Id
    // this.authService.appUser$.subscribe(appUser => this.userID = appUser.uid);

    this.authService.getAuth().subscribe(auth => {
      if(auth) {

        this.userID = auth.uid;
        this.getProfile();
      } else {
        console.log('There was an error...')
      }
    });
    console.log(this.userID);


    //2. use that ID to get the user's data
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

  // Update User feature to enter
}
