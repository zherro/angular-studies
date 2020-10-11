import { Component, Input, OnInit } from '@angular/core';

const cloud = "http://localhost:3000/imgs/"

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  private _url = '';

  @Input() description = "";
  @Input() set url(url: string) {
    if(!url.startsWith('data')){
      this._url = cloud + url;
    } else {
      this._url = url;
    }
  }

  constructor() { }

  ngOnInit() {
  }

  get url() {
    return this._url;
  }

}
