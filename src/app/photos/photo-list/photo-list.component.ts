import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  filter: string = '';
  photos: any[] = [
    // {url: './../assets/imgs/download (2).jpg', description: 'imagem teste'},
  ];
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: PhotoService) { }
  
  ngOnInit(): void {
    this.userName = this.route.snapshot.params.userName;
    this.photos = this.route.snapshot.data.photos;
  }
  load() {
    this.service.listFromUserPaginate(this.userName, ++this.currentPage)
    .subscribe(photos => {
      // this.photos.push(...this.photos);
      this.filter = '';
      this.photos = this.photos.concat(photos)
      if(!photos.length){
        this.hasMore = false;
      }
    })

  }

}
