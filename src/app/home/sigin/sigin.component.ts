import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  
  loginForm: FormGroup;
  fromUrl: string;
  @ViewChild('userNameImput', null) userNameImput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,    
    private authService: AuthService,
    private router: Router,
    private detectPlataform: PlataformDetectorService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fromUrl = params.fromUrl
    });

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userNameImput.nativeElement.focus();
  }

  login(){
    if(this.loginForm.valid) {
      const userName = this.loginForm.get('userName').value;
      const password = this.loginForm.get('password').value;

      this.authService
      .authenticate(userName, password)
      .subscribe(
        () => {
          this.fromUrl
            ? this.router.navigateByUrl(this.fromUrl)
           : this.router.navigate(['user', userName]);
        },
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
