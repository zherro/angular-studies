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
import { DarkenOnHoverModule } from '../shared/componets/directives/darken-on-hover/darken-on-hover.modeule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from '../shared/components/vmessage/vmessage.modeule';
import { Router, RouterModule } from '@angular/router';
import { ImmediateClickModule } from '../shared/componets/directives/immediate-click/immediate-click.module';

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

        CardModule,
        DarkenOnHoverModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        VMessageModule,
        ImmediateClickModule
    ]
})
export class PhotosModule {}