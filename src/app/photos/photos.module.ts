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
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { CommentComponent } from './photo-details/comment/comment.component';
import { PhotoOwnerDirective } from './photo-details/photo-owner-only/phoyo-owner.directive';
import { ShowIfLoggedDirective } from '../shared/componets/directives/show-if-logged/show-if-logged.directive copy';
import { ShowIfLoggedModule } from '../shared/componets/directives/show-if-logged/show-if-logged.module';

@NgModule({
    declarations: [ 
        PhotoComponent, 
        PhotoListComponent, 
        PhotoFormComponent, 
        PhotosComponent,
        
        filterByDescription,
        
        LoadButtonComponent,        
        SearchComponent,        
        PhotoDetailsComponent,        
        CommentComponent,
        PhotoOwnerDirective
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
        ImmediateClickModule,
        ShowIfLoggedModule
    ]
})
export class PhotosModule {}