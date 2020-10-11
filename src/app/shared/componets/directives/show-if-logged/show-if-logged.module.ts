import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShowIfLoggedDirective } from './show-if-logged.directive copy';

@NgModule({
    declarations: [ShowIfLoggedDirective],
    exports: [ShowIfLoggedDirective],
    imports: [CommonModule]
})
export class ShowIfLoggedModule {}