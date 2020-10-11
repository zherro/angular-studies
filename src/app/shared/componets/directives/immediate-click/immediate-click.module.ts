import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImmediateClickDirective } from './immediate-click.directive';

@NgModule({
    declarations: [ImmediateClickDirective],
    exports: [ImmediateClickDirective],
    imports: [CommonModule]
})
export class ImmediateClickModule {}