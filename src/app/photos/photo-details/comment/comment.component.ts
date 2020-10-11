import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'app-photo-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() photoId: string;

  photoComments$: Observable<PhotoComment[]>;
  commentForm: FormGroup;

  constructor(
    private service: PhotoService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.photoComments$ = this.service.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    })
  }


  save() {
    console.table('passou aui');
    let comment = this.commentForm.get('comment').value as string;

    this.photoComments$ = this.service
        .addComment(this.photoId, comment)
        .pipe(switchMap(() => this.service.getComments(this.photoId)))
        .pipe(tap(() => {
          this.commentForm.reset();
        }));

    
  }
 }
