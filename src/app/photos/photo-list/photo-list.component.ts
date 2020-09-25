import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: any[] = [
    // {url: './../assets/imgs/download (2).jpg', description: 'imagem teste'},
  ];


  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const userName = this.route.snapshot.params.userName;
    this.photoService
      .listFromUser(userName)
      .subscribe(photos => this.photos = photos);
  }

}
