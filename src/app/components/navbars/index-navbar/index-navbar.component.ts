import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-index-navbar",
  templateUrl: "./index-navbar.component.html",
})
export class IndexNavbarComponent implements OnInit {
  navbarOpen = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router,  private authService: AuthService,) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
      
        this.isLoggedIn = true;
        
        // this.isLoading = false;
      } else {
         this.isLoggedIn = false;
      }
    })
    
  }



  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }


  login(){
    this.router.navigate(['/auth/login']);
    console.info('Loggin...')
  }



  logout(){
   
    this.authService.logout();
    this.router.navigate(['/']);
  }


}



