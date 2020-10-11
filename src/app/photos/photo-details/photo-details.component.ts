import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.photoId;
    this.photo$ = this.service.findById(this.id);
  }

  remove() {
    this.service
      .removePhoto(this.id)
      .subscribe(() => this.router.navigate(['']));
  }
}
