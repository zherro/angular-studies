import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoComponent } from './photo/photo.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotosComponent } from './photo-list/photos/photos.component';
import { filterByDescription } from './photo-list/filter-by-descriptio.pipe';
import { LoadButtonComponent } from './photo-list/load-button/load-button.component';
import { CardComponent } from '../shared/componets/card/card/card.component';
import { CardModule } from '../shared/componets/card/card/card.module';
import { SearchComponent } from './photo-list/search/search.component';

@NgModule({
    declarations: [ 
        PhotoComponent, 
        PhotoListComponent, 
        PhotoFormComponent, 
        PhotosComponent,
        
        filterByDescription,
        
        LoadButtonComponent,
        
        SearchComponent
    ],
    imports: [ 
        HttpClientModule, 
        CommonModule,

        CardModule
    ]
})
export class PhotosModule {}