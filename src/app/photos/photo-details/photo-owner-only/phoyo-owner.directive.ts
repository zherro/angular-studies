import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { Photo } from '../../photo/photo';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerDirective implements OnInit{
    
    @Input() ownedPhoto: Photo;

    constructor(
        private element: ElementRef<any>,
        private reneder: Renderer2,
        private userService: UserService
    ){}

    ngOnInit(): void {
        this.userService
            .getUser()
            .subscribe(user => {
                if(!user || user.id != this.ownedPhoto.userId) {
                    this.reneder.setStyle(this.element.nativeElement, 'display', 'none');
                }
            })
    }

}