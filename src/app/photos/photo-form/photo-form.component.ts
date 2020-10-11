import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  constructor(
    private formBuilder : FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload() {
    let description = this.photoForm.get('description').value;
    let alowComments = this.photoForm.get('allowComments').value;
    this.photoService
      .upload(description, alowComments, this.file)
      .pipe(finalize(() => {
        this.router.navigate(['/user', this.userService.getUserName() ]);
      }))
      .subscribe(
          (event: HttpEvent<any>) => {
            if(event.type == HttpEventType.UploadProgress) {
              this.percentDone = Math.round(100 * event.loaded / event.total);
            }else if(event.type == HttpEventType.Response){
              this.alertService.success("Upload completed!", true);
            }
        },
        err => this.alertService.danger("Upload error!", true)
      );

    // console.table(dados);
  }

  handleFile(file: File){
    this.file = file;
    let reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
