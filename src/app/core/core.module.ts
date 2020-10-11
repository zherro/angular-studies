import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestInterceptor } from './auth/request.interceptor';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingModule } from '../shared/components/loading/loading.module';
import { AlertModule } from '../shared/components/alert/alert.module';
import { MenuModule } from '../shared/components/menu/menu.modeule';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    exports: [HeaderComponent, FooterComponent],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule,
        LoadingModule,
        MenuModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class CoreModule{

}