import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';

@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

    constructor(
            private element: ElementRef<any>,
            private plataformDetectorService: PlataformDetectorService
        ){}
    
    ngOnInit(): void {
        this.plataformDetectorService.isPlatformBrowser &&
        this.element.nativeElement.click();
    }
}