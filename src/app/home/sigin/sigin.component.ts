import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  
  loginForm: FormGroup;
  @ViewChild('userNameImput', null) userNameImput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,    
    private authService: AuthService,
    private router: Router,
    private detectPlataform: PlataformDetectorService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.userNameImput.nativeElement.focus();
  }

  login(){
    if(this.loginForm.invalid) {
      const userName = this.loginForm.get('userName').value;
      const password = this.loginForm.get('password').value;

      this.authService
      .authenticate(userName, password)
      .subscribe(
        () => this.router.navigate(['user', userName]),
        err => {        
          this.loginForm.reset();
          console.table(err);
          this.detectPlataform.isPlatformBrowser() && 
            this.userNameImput.nativeElement.focus();
        }
      );
    }
  }

}
