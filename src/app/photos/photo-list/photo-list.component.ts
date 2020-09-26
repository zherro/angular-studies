import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.photos = this.route.snapshot.data.photos;
  }

}
