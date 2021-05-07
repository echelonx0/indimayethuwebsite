import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  isMentor: boolean = false;

  constructor(    private authService: AuthService,
    private router: Router,) {}

  ngOnInit() {

    this.authService.appUser$.subscribe(appUser => this.isMentor = appUser.isMentor);

  }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
