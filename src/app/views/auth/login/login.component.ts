import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService,  private router: Router,) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('Submitting...')
    this.authService.login(this.email, this.password)
      .then(res => {
        // this.flashMessage.show('You are now logged in', {
        //   cssClass: 'alert-success', timeout: 4000
        // });

        this.router.navigate(['/admin/dashboard']);
      })
      .catch(err => {
        // this.flashMessage.show(err.message, {
        //   cssClass: 'alert-danger', timeout: 4000
        // });
      });
  }

}
