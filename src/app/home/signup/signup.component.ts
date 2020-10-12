import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';
import { NewUser } from 'src/app/core/user/new-user';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { SignUpService } from './signup.service';
import { UserNotFoundValidatorService } from './user-not-taken.validator.service';
import { userNamePassword } from './username-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ UserNotFoundValidatorService ]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('inputEmail', null) inputEmail: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotFoundValidatorService: UserNotFoundValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private plataformDetectorService : PlataformDetectorService
  ) { }

  ngOnInit() {
    const fn = this.userNotFoundValidatorService.checkUserNameTaken();

    this.signupForm = this.formBuilder.group({
      email: ['', 
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: ['',
      [
        Validators.required,
        lowerCaseValidator,
        Validators.minLength(2),
        Validators.maxLength(30)
      ],
      this.userNotFoundValidatorService.checkUserNameTaken()
    ],
      password: ['',  
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14)
      ]
    ]}, {
      validators: userNamePassword
    })

    this.plataformDetectorService.isPlatformBrowser() && 
      this.inputEmail.nativeElement.focus();
  }

  signup() {
    let newUser = this.signupForm.getRawValue() as NewUser;
    this.signUpService
      .signup(newUser)
      .subscribe(
        () => this.router.navigate(['']),
        err => console.log(err)
      );
  }

}
