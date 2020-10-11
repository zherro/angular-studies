import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading$: Observable<string>;

  constructor(
    private service: LoadingService
  ) { }

  ngOnInit() {
     this.loading$ = this.service.getLoading()                        
                    .pipe(map(loadingType => loadingType.valueOf()));
  }
}
