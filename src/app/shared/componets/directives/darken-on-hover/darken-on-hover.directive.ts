import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDarkenOnHover]'
})
export class DarkenOnHoverDirective{

    @Input() brightness = "70%";

    // ElementRef para utilizar diretamente elementos do DOM
    constructor(
        private el: ElementRef,
        private render: Renderer2
    ) {}
    
    // HostListener para capturar acoes do usuario
    @HostListener('mouseover')
    darkenOn() {
        console.table('darkenOn');

        // Renderer2 para manimular elementos do DOM 
        this.render.setStyle(this.el.nativeElement, 'filter',  `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        console.table('darkenOff');
        this.render.setStyle(this.el.nativeElement, 'filter',  'brightness(100%)');
    }
}