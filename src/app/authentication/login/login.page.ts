import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  registeredStudent: any = [];
  loginTemplate:boolean=true;
  signInTemplate:boolean=false;
  errorMessage:string="User Id & Password are required.";
  errorMessagefromService:string="";
  showPassword: boolean = false;
  getdata: any;
  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private commonService: CommonService,
  ) {
    addIcons({  eyeOffOutline,  eyeOutline });
    this.loginForm = new FormGroup({
      userNmae: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.registeredStudent = this.databaseService.getRegisteredStd();
  }

  // onLoginClick() {
  //   this.commonService.getData().then(data => {
  //     this.getdata = data; // save response
  //     console.log("✅ Data received:", this.getdata);
  //   }).catch(error => {
  //     console.error("❌ Error:", error);
  //   });
  // }


  getLogin() {
  if (this.loginForm.valid) {
    const loginData = this.loginForm.getRawValue();
    console.log("Login Data:", JSON.stringify(loginData));

    const loginBody = {
      username: loginData.userNmae, 
      password: loginData.password
    };

    this.commonService.getLogin(loginBody).subscribe({
      next: (response) => {
        this.errorMessagefromService = "";

        const token = response.headers?.get('Authorization') || response.headers?.get('authorization');
        if (token) {
          console.log('Token from headers:', token);
          localStorage.setItem('token', token);
        } else {
          console.warn('Token not found in headers');
        }
        localStorage.setItem('loggedUser', JSON.stringify(response.body));

        this.loginForm.reset();
        this.router.navigate(['/apps']);
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.errorMessagefromService = "Please try again!";
        this.loginForm.markAllAsTouched();
      }
    });
  } else {
    this.errorMessagefromService = "";
    this.loginForm.markAllAsTouched();
  }
}

  

  getSignIn(){
    // this.router.navigate(["/auth/sign-in"])
    this.signInTemplate=true;
    this.loginTemplate=false;
  }

  goToLogin(){
    this.loginTemplate=true;
    this.signInTemplate=false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  clearMsg(){
    this.errorMessagefromService="";
  }
}
