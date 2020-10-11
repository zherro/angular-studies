import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit{

    constructor(
        private element: ElementRef<any>,
        private reneder: Renderer2,
        private userService: UserService
    ){}

    ngOnInit(): void {
        !this.userService.isLogged()
            && this.reneder.setStyle(this.element.nativeElement, 'display', 'none');

    }

}