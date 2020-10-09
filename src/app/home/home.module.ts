import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VMessageModule } from '../shared/components/vmessage/vmessage.modeule';
import { SiginComponent } from './sigin/sigin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [SiginComponent, SignupComponent],
    exports: [SiginComponent, SignupComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        VMessageModule,
        RouterModule,
        FormsModule
    ]
})
export class HomeModule{ }