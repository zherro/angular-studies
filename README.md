
# AngularStudies
> Projeto para aplicação de conhecimentos

## Menu

* [Versions](#versions)
* [Configurações iniciais](#configurações-iniciais)
	* [Animations](#animations)
	* [Materialize](#materialize)
  * [font-awesome](#font-awesome)
* [Módulos e Componentes](#módulos-e-componentes)
	* [Criando componente](#criando-componente)
	* [Criando módulo](#criando-módulo)
	* [Parâmetros](#parâmetros)
* [Subject e BehaviorSubject](#subject-e-behaviorsubject)
* [Rotas](#rotas)
  * [Retrocompatibilidade com navegadores](#retrocompatibilidade-com-navegadores)
  * [Parâmetros Dinâmicos](#parâmetros-dinâmicos)
  * [Proteção de Rotas (AuthGuard)](#proteção-de-rotas-authguard)
* [HttpClient - consumo de api](#httpclient---consumo-de-api)
	* [Consumindo uma API](#consumindo-uma-api)
	* [Consumindo Service API](#consumindo-service-api)
* [SimpleChanges in ngOnChange function](#simpleChanges-in-ngonchange-function)
* [target event](#target-event)
* [Data Trasform com pipe](#data-trasform-com-pipe)
  * [Custom pipe](#custom-pipe)
* [Resolver](#resolver)
  * [Implemenação](#implemenação)
* [Comunicação entre compoentes](#comunicação-entre-compoentes)
* [Diretivas](#diretivas) 
* [Detectando a plataforma de execução](#detectando-a-plataforma-de-execução)
* [JWT decode](#jwt-decode)
  * [Utlização](#utlização)
* [Angular Forms](#angular-forms)
  * [Validators](#validators)
  * [Custom validators](#custom-validators)
  * [Custom validator service](#custom-validator-service)
* [Build](#build)

## Versions
 - [Angular 8.3.12](https://angular.io/){:target="_blank"}
 - [Materialize ^6.1.3](https://materializecss.com/){:target="_blank"}

## Configurações iniciais
 [Voltar ao topo &#8673;](#menu)

 

### Animations
 [Voltar ao topo &#8673;](#menu)

 

> Você usa animações adicionando-as a cada módulo que deseja que sejam usados. Se você deseja que eles sejam usados ​​em todo o seu aplicativo, você pode adicioná-los ao seu `app.module.ts` arquivo assim:
```cmd
	npm install --save @angular/animations
```

``` javascript
import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';
import { AppComponent } from  './app.component';
// add
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		// add
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})

export  class  AppModule { }
```

### Materialize
 [Voltar ao topo &#8673;](#menu)

 

> Criado e projetado pelo Google, o Material Design é uma linguagem de design que combina os princípios clássicos do design de sucesso com inovação e tecnologia. 

```javascript
	// realiza instalação do materialize em seu projeto
    npm install --save ngx-materialize
    npm install --save @mdi/font

	// adiciona Jquery ao projeto se necessário
    npm install --save  jquery
```
```json
		// no arquivo angular.json adicione os arquivos js e css necessários
		"styles": [
			"src/styles.css",
			"node_modules/materialize-css/dist/css/materialize.min.css",
			"node_modules/@mdi/font/css/materialdesignicons.min.css"
		],
		"scripts": [
			"node_modules/jquery/dist/jquery.min.js",
			"node_modules/materialize-css/dist/js/materialize.min.js"
		]
```

## font-awesome
 [Voltar ao topo &#8673;](#menu)

 

Adicionar pacote ao projeto

```
$ npm install font-awesome
```

Em seguida adicionar ao `angular.json`

```javascript
"styles": [
    "src/styles.css",
    "node_modules/font-awesome/css/font-awesome.css",
    ...
  ],
```

##  Módulos e Componentes 
 [Voltar ao topo &#8673;](#menu)

 

Um componente reutilizável e acionada através do selector name, definido no próprio componente.

	<app-componente-name></app-componente-name>

### Criando componente
 [Voltar ao topo &#8673;](#menu)

 
```javascript
// cria componente utilizando angular CLI
ng generate component nomedocompomente
```
Para tornar o componente reutilizável, incluir a declaração do componente no arquivo `app.module.ts`:
```javascript
...
@NgModule({
	declarations: [
	AppComponent,
	// adiconar componente aqui, atentar para importação do componente
	// a partir disso o componente ja pode ser utilizado através do seu selector
],
...
```

### Criando módulo
 [Voltar ao topo &#8673;](#menu)

 
Um modulo é um arquivo .ts  que agrupa e disponibiliza um ou mais componentes. 
Exemplo de configuração do módulo `photos.module.ts`:

> IMPORTANTE: o módulo sempre deve importar as dependendias de seus componentes.
> Um componente comum é o `CommomModules`, módulo que fornece diretivas base com `ngIf`, `ngFor` e binds do angular.

```javascript
import { NgModule } from  '@angular/core';
import { PhotoComponent } from  './photo/photo.component';  // importação do componente

@NgModule({
	declarations: [ PhotoComponent ], // declaração do componete
	exports: [ PhotoComponent ] // se o componente não for exportado não estará disponivel para utlilização
})
export  class  PhotosModule {}
```

Para declarar o modulo e disponibilizar os componentes para toda a aplicação, realizar import do módulo no arquivo `app.module.ts`:
```javascript
@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		PhotosModule
	],
	providers: [],
	bootstrap: [AppComponent]
})

export  class  AppModule { }
```

###  Parâmetros
 [Voltar ao topo &#8673;](#menu)

 
Para adicionar parâmetros em um componente, utilizar o @Input()

```javascript
// no componente.ts
import {  Input } from  '@angular/core';
...
@Input() description = "";
@Input() url = "";
... 

// no component.html
<img  [src]="url"  [alt]="description"  class="responsive-img"  >

// utlização do componente 
<app-photo [url]="./../../assets/imgs/imagem.jpge" [description]="Imgagem aleatória" ></app-photo>
```
## Subject e BehaviorSubject
 [Voltar ao topo &#8673;](#menu)

 

`BehaviorSubject` é um tipo de subject, um subject é um tipo especial de observable para que você possa assinar mensagens como qualquer outro observable. Os recursos exclusivos do BehaviorSubject são:

* Ele precisa de um valor inicial, pois sempre deve retornar um valor na assinatura, mesmo que não tenha recebido um `next()`
* Na assinatura, ele retorna o último valor do assunto. Um observável regular apenas dispara quando recebe um `onnext`
* a qualquer momento, você pode recuperar o último valor do assunto em um código não observável usando o método `getValue()`

## Rotas
 [Voltar ao topo &#8673;](#menu)

 
> Criar arquivo `app-routing.module.ts` na pasta `./src/app`

```javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// componente customizado
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes = [
  { path: 'url/exemplo', component:ExampleComponent }, 
  { path: '**', component: NotFoundComponent } // not found - 404
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) // importante
  ],
  exports: [
    RouterModule // importante para que o appModule obtenha as rotas
  ]
})
export class AppRoutingModule { }
```

> no arquivo `app.module.ts`, realizar import do nosso componente de rotas.

```javascript
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,  // <------

	...
	
    ErrorsModule
  ],
```


### Retrocompatibilidade com navegadores

O angular por padrão trabalha apenas com as duas ultimas versões de alguns navegadores.

Isso significa que navegadores antigos não são testados pela equipe do Angular.

Dessa forma pode ocorrer alguns problemas em navegadores antidos e um deles é relacionado a navegação.

Caso houver problemas quanto ao direcionamento de rotas da aplicação utilizar a configuração `{useHash: true}` no `app-routing-module.ts`.

Assim será adicionado um `#` na url, impedindo que a aplicação consulte o backend para o redireciomanto de rotas.

```javascript
... 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
```


### Parâmetros Dinâmicos 
 [Voltar ao topo &#8673;](#menu)

 
> Para adicionar paramentros as rotas, utilizar `/:paranName`

```javascript
...
const routes = [
  { path: 'minha-url/:paran1/:paran2', component: ExampleComponent },  // representa: minha-url/qualquer/coisa
  ...
  { path: '**', component: NotFoundComponent }
];
...
```
> Para capturar os valores passado no controler do componente utilizar o modulo `ActivatedRoute`.

```javascript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
...
export class ExampleComponent implements OnInit {

  constructor( private route: ActivatedRoute  ) { }

  ngOnInit(): void {
    const paran1 = this.route.snapshot.params.paran1;
    const paran2 = this.route.snapshot.params.paran2;
  }
}
```

### Proteção de Rotas (AuthGuard)
 [Voltar ao topo &#8673;](#menu)

 

Criar um arquivo de configuração de guarda, nesse exemplo `auth.guard.ts`

```javascript
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../user/user.service';

// para que possa ser injetado por toda a aplicação
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    
    constructor(
        private userSevice: UserService,
        private router: Router) {

    }

    // methodo da interface 'CanActivate'
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // implementação para fintro de acesso a rota
        if(this.userSevice.isLogged()){
            this.router.navigate(['user', this.userSevice.getUserName()])
            return false;
        }
        return true;
    }    
}
```

> a utilização é definida por configuração no arquivo `app-routing.modules.ts`, por meio do atributo `canActivate: [...]`, podendo ser passado mais de um guard como parametro

```javascript
...
const routes = [  
  { path: '', component: SiginComponent, canActivate: [AuthGuard] },
  ...
];

@NgModule({
  ...
})
export class AppRoutingModule { }
```

##  HttpClient - consumo de api
 [Voltar ao topo &#8673;](#menu)

 
O modulo pode ser importado no `app.modules.ts`, assim estará disponível em toda a aplicação.
> Uma boa pratica é importar o o modulo `HttpClientModule` diretamente no módulo customizado e não de forma global
```javascript
import { HttpClientModule } from  '@angular/common/http';
...
imports: [
	HttpClientModule,
	CommonModule
]
...
```
### Consumindo uma API
 [Voltar ao topo &#8673;](#menu)

 
Exemplo de um arquivo `.service.ts`
```javascript
import { HttpClient } from  '@angular/common/http';
import { Injectable } from  '@angular/core';  

const API = '';

@Injectable({ providedIn:  'root' })	// para que o serrviço possa ser injetado em outros componentes
export  class  ExampleService{ 

	constructor(private  http: HttpClient){}
	  
	list(){
		// para especificar o tipo de retorno com uma interface
		// subistir o Object[] por SuaIterface[]
		return this.http.get<Object[]>(API+ '/all');
	}
}
```

### Consumindo Service API
 [Voltar ao topo &#8673;](#menu)

 
```javascript
export  class  ExampleListComponent{
	data: any[] = [];
	
	constructor(
		private  service: ExampleService
	) { }

	all(){
		this.photoService
			.list()
			.subscribe(data =>  this.data = data);
	}
}
```

## SimpleChanges in ngOnChange function
 [Voltar ao topo &#8673;](#menu)

 

**SimpleChanges** é um recurso Angular / Core que pode ser usado para ver as mudanças e mais alguns detalhes dos nomes das propriedades declaradas em um componente. E também precisa ser usado nome todo Angular **ngOnChange** para ver as mudanças de valores e fazer coisas relevantes.

Simplesmente o **ngOnChange** é disparado quando os valores das propriedades declaradas são alterados. Portanto, nesse método, podemos definir isso como um parâmetro para armazenar os dados. como isso:

```javascript
...
ngOnChanges(changes: SimpleChanges) {
...
```

> Um exemplo mais funcional. Quando o [@Input](#parâmetros) for alterado, o `ngOnChange` sera acionado:

> > Note que foi implentanda a interface `OnChanges`

```javascript
import { SimpleChanges } from '@angular/core';
...
export class ExampleOtherComponent implements OnChanges {

  @Input() paran: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
      if(changes.paran) {
		// actions here
        ...
      }
  }
```

## target event
 [Voltar ao topo &#8673;](#menu)

 

Para capturar ventos de compoentes html

> [Angular Events](https://angular.io/guide/event-binding){:target="_blank"}

```html
<input type="text"
       (input)="currentItem.name = $event.target.value"
        >

<input 
        type="text"
        (keyup)="filter = $event.target.value"
        >
```

## Data Trasform  com pipe
 [Voltar ao topo &#8673;](#menu)

 

Transformadores que poden ser utilizados em `ng expressions`

> [Transforming Data Using Pipes](https://angular.io/guide/pipes){:target="_blank"}

```html
<p>The hero's birthday is {{ birthday | date }}</p>
...
<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }} </p>
...
{{ birthday | date | uppercase}}
```

### Custom pipe
 [Voltar ao topo &#8673;](#menu)

 

Ainda é possivel definir um transformador customizado:

> deve ser declarado no modulo na sessão `declarations`

```javascript
// src/app/exponential-strength.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}
```

```javascript

// src/app/power-booster.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-power-booster',
  template: `
    <h2>Power Booster</h2>
    <p>Super power boost: {{2 | exponentialStrength: 10}}</p>
  `
})
export class PowerBoosterComponent { }
```

## Resolver
 [Voltar ao topo &#8673;](#menu)

 

Interface que as classes podem implementar para ser um provedor de dados. Uma classe de provedor de dados pode ser usada com o roteador para resolver os dados durante a navegação. A interface define um resolve()método que é chamado quando a navegação é iniciada. O roteador espera que os dados sejam resolvidos antes que a rota seja finalmente ativada.
['traduzido']

> 

```javascript
interface Resolve<T> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T
}
```

### Implemenação
 [Voltar ao topo &#8673;](#menu)

 

> Um exemplo de utilização, é para casos onde a página deve aguardar a consulta de um serviço

```javascript
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

...
// File example.resolve.ts

@Injectable({ providedIn: 'root' })
export class ExampleResolver implements Resolve<Observable<Object[]>>{

    constructor(private service: ExampleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Object[]> {
        ...

        return ...;
    }
}
```

```javascript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
...
export class ExampleComponent implements OnInit {

...
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
	// this.route.snapshot.data...  <<--
    this.photos = this.route.snapshot.data.photos;
  }
}
```

```javascript
...
const routes = [
  {
    path: 'my-url/:paran1', component: ExampleComponent,
    resolve: {
      photos: ExampleResolver
    }
  },
 ...
];
```


## Comunicação entre compoentes
 [Voltar ao topo &#8673;](#menu)

 

A comunicação pode ser realizada através de um custom event.

> Exemplo de um componente de pesquisa 

```javascript
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  // evento customizado
  @Output() onTyping = new EventEmitter<string>();
  
  @Input() value:string ='';
  debounce: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnInit() {
    this.debounce
      .pipe(debounceTime(300)) // quando parar de digitar po 300ms aciona o subscribe
      .subscribe(filter => this.onTyping.emit(filter));
  }
  
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
```
> `$event.target.value` capitura o value do imput em tempo de execução

```html
<div class="container mt-m">
    <div class="row">
      <div class="input-field input-box col s5 center-box">
        <input 
          id="input_text" 
          type="text" 
          data-length="10"
          autofocus
          (keyup)="debounce.next($event.target.value)"
          [value]="value"
          >
        <label for="input_text">Pesquisar</label>
      </div>
    </div>
  </div>
```

> O evento customizado `onTyping` estará assistindo o compente e informando as transições de estado. 
> 

```html
<!-- utlizacao do componete -->
<app-search (onTyping)="filter = $event" [value]="filter"></app-search>
```
```javascript
...
// declaração do atributo filter no compenente que utiliza o `app-search`
filter: string = '';
...
```


## Diretivas
 [Voltar ao topo &#8673;](#menu)

 

> Diretivas podem ser utilizadas para definir um comportamento de um elemento da página.

Exemplo de diretiva de hover:

```javascript
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDarkenOnHover]'
})
export class DarkenOnHoverDirective{

	// propriedade da diretiva
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
```

Utilizando a diretiva

```html
<div class="card" appDarkenOnHover brightness="80%">
```

## Detectando a plataforma de execução
 [Voltar ao topo &#8673;](#menu)

 

Ao chamar o método `isPlatformBrowser` sera retornando true se estivere sendo executado em um navegador.

```javascript
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

// metodo para detecção de plataforma
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
```

## JWT decode
 [Voltar ao topo &#8673;](#menu)

 

Para realizar decode de um token JWT

```
# instalar pacote

npm install jwt-decode
```

### Utlização
 [Voltar ao topo &#8673;](#menu)

 

```javascript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TokenService } from '../toke/token.service';
import jwt_decode from 'jwt-decode';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // sempre utilizar o BehaviorSubject para quando um serviço é carrega antes do componente
  private userSubject = new BehaviorSubject<User>(null);

  constructor(private tokeService: TokenService) {

    this.tokeService.hasToken() &&
      this.decodeAndNotfy();
  }

  setToken(token: string) {
    this.tokeService.setToken(token);
    this.decodeAndNotfy();
  }

  getUser() {
    // retorn um observable para dar subscribe
    return this.userSubject.asObservable();
  }

  private decodeAndNotfy() {
    const token = this.tokeService.getToken();

    // decode do token
    const user = jwt_decode(token) as User;
    this.userSubject.next(user);
  }
}
```

## Angular Forms
 [Voltar ao topo &#8673;](#menu)

 

Para utilizar os recursos do angular forms é necessário atender alguns requisitos:
- Importar o módulo `FormsModule`
- Criar a varaivel de representação do formulário do tipo `FormGroup`
- Injetar um `FormBuilder` para criação do formulário 

> arquivo `.module.ts`
```javascript
// importação do modulo
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
...
@NgModule({
   ....
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule
    ]
})
```

> arquivo `.component.ts`
```javascript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
...
export class SignupComponent implements OnInit {

  // cria a variavel de representação do formulário
  signupForm: FormGroup;

  // injeta o form builder
  constructor(private formBuilder: FormBuilder) { }

  // cria o formulario com sual propriedades
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [''],
      fullName: [''],
      userName: [''],
      password: [''],
    })
  }
}
```

> arquivo `.component.html`

```html
<div class="container">
    <h4 class="center">Register to embrace a new world!</h4>
    <!-- vincula a varaivel ao formulario e seus atributos -->
    <form class="form mt-s" [formGroup]="signupForm"  (submit)="submitFormMetod()">
       <input formControlName="email" id="email" type="email">
       <input formControlName="fullName" id="full-name" type="text">
       <input formControlName="userName" id="user-name" type="text">
       <input formControlName="password" id="password" type="password" >
      <button class="btn blue right">Register</button>
    </form>
</div> 
```

### Validators
 [Voltar ao topo &#8673;](#menu)

 

Para facilitar, será apenas realizado o incremento do código acima.

> arquivo `.component.ts`
```javascript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
...
export class SignupComponent implements OnInit {

  // cria a variavel de representação do formulário
  signupForm: FormGroup;

  // injeta o form builder
  constructor(private formBuilder: FormBuilder) { }

  // cria o formulario com sual propriedades
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['',
        [
            Validators.required,
            Validators.email
        ]
      ],
      fullName: ['', []],
      userName: [''
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9_\-]+$/),
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],
      password: [''],
    })
  }
}
```

> arquivo `.component.html`

Verificando se alguma validação não esta sendo atendida e apresentando mensagem equivalente.
```html
<div class="container">
    <h4 class="center">Register to embrace a new world!</h4>
    <!-- vincula a varaivel ao formulario e seus atributos -->
    <form class="form mt-s" [formGroup]="signupForm">
      <div>
        <input formControlName="email" id="email" type="email">
        <small *ngIf="signupForm.get('email').errors?.required">Informe seu email!</small>
        <small *ngIf="signupForm.get('email').errors?.email">Email invalido</small>
      </div>
       ...
       <div>
        <input formControlName="userName" id="user-name" type="text">
         <small *ngIf="signupForm.get('userName').errors?.required">Campo obrigatorio</small>
         <small *ngIf="signupForm.get('userName').errors?.minlength">No minimo 2 caracteres</small>
        <small *ngIf="signupForm.get('userName').errors?.maxlength">No maximo 30 caracteres</small>
        <small *ngIf="signupForm.get('userName').errors?.pattern">deve contar apenas numeros e letras (a-z e 0-9)!</small>
      </div>
       ...
       <!-- desabilita o botao se o formular não estiver 100% validado -->
      <button [disabled]="signupForm.invalid" class="btn blue right">Register</button>
    </form>
</div> 
```

### Custom validators
 [Voltar ao topo &#8673;](#menu)

 

Criando um validator customizado.
Um validator por ser uma função apenas, ou uma função de uma classe.

> arquivo `src/app/shared/validators/lower-case.validator.ts`
```javascript
import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl) {
    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        // ATENCAO: lowerCase será o retorno do validador
        return {lowerCase: true}
    }
    return null;
} 
```

> utilização

```javascript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// importacao do nosso Validator
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';

  export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;

  ...

  ngOnInit() {
    const fn = this.userNotFoundValidatorService.checkUserNameTaken();

    this.signupForm = this.formBuilder.group({
      email: ['', 
        [
     export class SignupComponent implements OnInit {
      ngOnInit() {
        this.signupForm = this.formBuilder.group({
          ...
          userName: ['',
            [
              Validators.required,          
              Validators.minLength(2),
              Validators.maxLength(30),
              // aqui realizamos a referencia ao nosso validador customizado
              lowerCaseValidator
            ]
          ],
        password: ['']
        ...
```

Assim tempos que observar a necessidade de alteração da verificação de validações.
Neste caso removemos a validação por pattern e adicionamos a validação customizada.

> Mudando da seguinte forma:

```html
  ...
    <div>
        <input formControlName="userName" id="user-name" type="text">
         <small *ngIf="signupForm.get('userName').errors?.required">Campo obrigatorio</small>
         <small *ngIf="signupForm.get('userName').errors?.minlength">No minimo 2 caracteres</small>
        <small *ngIf="signupForm.get('userName').errors?.maxlength">No maximo 30 caracteres</small>
        <!-- ATENCAO: note que é utilziado o retorno do validador para verificar se o mesmo foi atendido-->
        <small *ngIf="signupForm.get('userName').errors?.lowerCase">deve contar apenas numeros e letras (a-z e 0-9)!</small>
    </div>
    ...
```

### Custom validator service
 [Voltar ao topo &#8673;](#menu)

 

Há momentos em que é necessário realizar uma validação que necessita o consumo de um serviço. Para esse fim pe possivel criar um Validator service.

> arquivo `src/app/home/signup/user-not-taken.validator.service.ts`

```javascript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = "http://localhost:3000";

@Injectable({providedIn: 'root'})
export class SignUpService {


    constructor (private http: HttpClient) {}

    checkUserNameTaken(userName: string){
        return this.http.get(API_URL + '/user/exists/' + userName);
    }
} 

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';
import { SignUpService } from './signup.service';

@Injectable({providedIn: 'root'})
export class UserNotFoundValidatorService {

    // inheção de um serviço que retorna um observable
    constructor(private signUpService: SignUpService){}

    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName => 
                    this.signUpService.checkUserNameTaken(userName)
                ))
                .pipe(map(isTaken => isTaken ? {userNameTaken: true } : null ))
                .pipe(first());
        }
    }

} 
```
> Utilização

Por ser um serviço e depender de uma requisição, nosso validador é asincrono e por isso não temos controle sobre o tempo de processamento das informações.

Porém, a decração de um `fieldForm` permite a inclusão dos seguintes paramentros na sua declarção `fieldName: ['default value', [...array de validators sincronos], [... array de validator ASSINCRONOS]]`.

Dessa forma é possivel declarar: 


```javascript
    ...
    import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
    import { UserNotFoundValidatorService } from './user-not-taken.validator.service';
    ...
    constructor(
        private formBuilder: FormBuilder,
        private userNotFoundValidatorService: UserNotFoundValidatorService
      ) { }
    ...
      userName: ['',
      [
        Validators.required,
        lowerCaseValidator, // o validar customizado
        Validators.minLength(2),
        Validators.maxLength(30)
      ]
      ],
      this.userNotFoundValidatorService.checkUserNameTaken() // o validador assincrono
    ],
    ... 
```

No html para verificar o atendimento da validação, segue-se o padrão do validador customizado

> Mudando da seguinte forma:

> >  Quando utilizamos validadores asincronos e é necessário verificar se o formulario esta valido alé de `signupForm.invalid` devemos também verivicar se os async validators também foram atendidos com a expressão `signupForm.pending`.
```html
  ...
    <div>
        <input formControlName="userName" id="user-name" type="text">
         <small *ngIf="signupForm.get('userName').errors?.required">Campo obrigatorio</small>
         <small *ngIf="signupForm.get('userName').errors?.minlength">No minimo 2 caracteres</small>
        <small *ngIf="signupForm.get('userName').errors?.maxlength">No maximo 30 caracteres</small>
        <small *ngIf="signupForm.get('userName').errors?.lowerCase">deve contar apenas numeros e letras (a-z e 0-9)!</small>
        <!-- ATENCAO: note que é utilziado o retorno do validador para verificar se o mesmo foi atendido-->
        <small *ngIf="signupForm.get('userName').errors?.userNameTaken">Nome de usuário ja existe</small>
         <small *ngIf="signupForm.get('userName').valid" class="green-text">Nome de usuário disponivel!</small>
    </div>
    ...
    <button [disabled]="signupForm.invalid || signupForm.pending" class="btn blue right">Register</button>
```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
