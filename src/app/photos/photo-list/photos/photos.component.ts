import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
      if(changes.photos) {
        this.rows = this.groupColumns(this.photos);
      }
  }

  groupColumns(phothos: Photo[]){
    const newRows = [];

    for(let index = 0; index < this.photos.length; index += 3){
      newRows.push(this.photos.slice(index, index + 3));
    }
    return newRows;
  }

}
