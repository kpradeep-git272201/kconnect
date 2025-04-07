import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { CommonService } from 'src/app/services/common.service';


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
  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private commonService: CommonService
  ) {
    this.loginForm = new FormGroup({
      userNmae: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.registeredStudent = this.databaseService.getRegisteredStd();
  }

  getLogin() {
    this.router.navigate(['/apps']);
    if (this.loginForm.valid) {
      const loginData = this.loginForm.getRawValue();
      console.log("Login Data:", JSON.stringify(loginData));
      this.commonService.getLogin({ username: 'anu', password: 'Admin@123' })
      .subscribe({
        next: (response) => {
          localStorage.setItem('loggedUser', response);
          this.loginForm.reset();
          this.router.navigate(['/apps']);
          // const token = response.headers.get('Authorization'); // 👈 Get token from headers
          // console.log('Token from headers:', token);
          // console.log('Login Success:', response.body);

          // if (token) {
          //   console.log('Token:', token);
          //   localStorage.setItem('token', token);
          // } else {
          //   console.warn('Token not found in headers');
          // }
        },
        error: (err) => {
          console.error('Login Failed:', err);
        }
      });
      /** const matchedStudent = this.registeredStudent.find(
        (student: { name: string; admissionNumber: string; dob: string }) =>
          student.name.toUpperCase() === loginData.name.toUpperCase() &&
          student.admissionNumber.toUpperCase() === loginData.admissionNumber.toUpperCase() &&
          student.dob === loginData.dob
      ); */
  
      /** console.log("Matched Student:", matchedStudent);

      if (matchedStudent) {
        this.router.navigate(['/apps'], {
          queryParams: {
            name: matchedStudent.name,
            admissionNumber: matchedStudent.admissionNumber,
            dob: matchedStudent.dob
          }
        });
      } else {
        alert('Invalid credentials. Please try again.');
      } */
    } else {
      this.loginForm.markAllAsTouched();
      // alert('Please fill all fields!');
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
}
