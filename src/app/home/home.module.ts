import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VMessageModule } from '../shared/components/vmessage/vmessage.modeule';
import { SiginComponent } from './sigin/sigin.component';

@NgModule({
    declarations: [SiginComponent],
    exports: [SiginComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        VMessageModule,
        RouterModule
    ]
})
export class HomeModule{ }