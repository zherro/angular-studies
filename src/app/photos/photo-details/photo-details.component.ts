import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Photo } from '../photo/photo';
import { PhotoComment } from '../photo/photo-comment';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  id: string;
  photo$: Observable<Photo>;

  constructor(
    private route: ActivatedRoute,
    private service: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.photoId;
    this.photo$ = this.service.findById(this.id);
    this.photo$.subscribe(() => {}, err => {
      this.router.navigate(['not-found'])
    })
  }

  remove() {
    this.service
      .removePhoto(this.id)
      .subscribe(
        () => {
          this.alertService.success("Photo removed!", true);
          this.router.navigate(['/user', this.userService.getUserName ])
      },
      err => {
        this.alertService.danger("Photo not removed!", true);
      });
  }

  like(photo :Photo){
    this.service
      .like(photo.id + '')
      .subscribe(liked => {
        if(liked){
          this.photo$ = this.service.findById(photo.id + '');
        }
      })
  }
}
