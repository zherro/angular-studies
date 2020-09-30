import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlataformDetectorService {

  constructor(@Inject(PLATFORM_ID) private plataforID: string) { }

  isPlatformBrowser(){
    return isPlatformBrowser(this.plataforID);
  }
}
