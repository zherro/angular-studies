import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotFoundValidatorService } from './user-not-taken.validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userNotFoundValidatorService: UserNotFoundValidatorService
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
    ],
    })
  }

}
