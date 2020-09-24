import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-studies';

  photos = [
    {url: './../assets/imgs/download (2).jpg', description: 'imagem teste'},
    {url: './../assets/imgs/download (3).jpg', description: 'imagem teste'},
    {url: './../assets/imgs/download (4).jpg', description: 'imagem teste'},
    {url: './../assets/imgs/download (6).jpg', description: 'imagem teste'},
    {url: './../assets/imgs/download (5).jpg', description: 'imagem teste'},
  ]

}
