import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../shared/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: any = "";


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || "/";
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    window.location.href = this.returnUrl;

    // this.loading = true;
    // this.authenticationService
    //   .login(this.loginForm.value)
    //   .subscribe({
    //     next: status => {
    //       if (status) {
    //         /*return this.router.navigate([this.returnUrl]).then(() => {
    //           window.location.reload();
    //         });*/
    //         console.log(this.returnUrl);
    //         window.location.href = this.returnUrl;
    //       } else {
    //         this.error = {
    //           error_description: "Bad credentials"
    //         };
    //         this.loading = false;
    //       }
    //       return;
    //     },
    //     error: error => {
    //       this.error = {
    //         error_description: "Something went wrong"
    //       };
    //       console.log("error==> ", error);
    //       this.loading = false;
    //     }
    //   });
    // TODO: Authenticate the login - Use authentication service.
    // this.router.navigate([this.returnUrl]);
  }
}
