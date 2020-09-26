
# AngularStudies
> Projeto para aplicação de conhecimentos

## Table of Contents

* [Versions](#versions)
* [Configurações iniciais](#configurações-iniciais)
	* [Animations](#animations)
	* [Materialize](#materialize)
* [Módulos e Componentes](#módulos-e-componentes)
	* [Criando componente](#criando-componente)
	* [Criando módulo](#criando-módulo)
	* [Parâmetros](#parâmetros)
* [Rotas](#rotas)
	* [Parâmetros Dinâmicos](#parâmetros-dinâmicos)
* [HttpClient - consumo de api](#httpclient---consumo-de-api)
	* [Consumindo uma API](#consumindo-uma-api)
	* [Consumindo Service API](#consumindo-service-api)
* [SimpleChanges in ngOnChange function](#simpleChanges-in-ngonchange-function)
* [target event](#target-event)
* [Trasform data com pipe](#trasform-data-com-pipe)
* [Resolver](#resolver)
* [Build](#build)

## Versions
 - [Angular 8.3.12](https://angular.io/)
 - [Materialize ^6.1.3](https://materializecss.com/)

## Configurações iniciais

### Animations

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

##  Módulos e Componentes

Um componente reutilizável e acionada através do selector name, definido no próprio componente.

	<app-componente-name></app-componente-name>

### Criando componente
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
Um modulo é um arquivo .ts  que agrupa e disponibiliza um ou mais componentes. 
Exemplo de configuração do módulo `photos.module.ts`:
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

## Rotas
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

### Parâmetros Dinâmicos
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


##  HttpClient - consumo de api
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

**SimpleChanges** é um recurso Angular / Core que pode ser usado para ver as mudanças e mais alguns detalhes dos nomes das propriedades declaradas em um componente. E também precisa ser usado nomé todoAngular **ngOnChange** para ver as mudanças de valores e fazer coisas relevantes.

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

Para capturar ventos de compoentes html

> [Angular Events](https://angular.io/guide/event-binding)

```html
<input type="text"
       (input)="currentItem.name = $event.target.value"
        >

<input 
        type="text"
        (keyup)="filter = $event.target.value"
        >
```

## Trasform data com pipe

Transformadores que poden ser utilizados em `ng expressions`

> [Transforming Data Using Pipes](https://angular.io/guide/pipes)

```html
<p>The hero's birthday is {{ birthday | date }}</p>
...
<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }} </p>
...
{{ birthday | date | uppercase}}
```

Ainda é possivel definir um transformador customizado:

> deve ser declarado no modulo na sessão `declarations`

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

Interface que as classes podem implementar para ser um provedor de dados. Uma classe de provedor de dados pode ser usada com o roteador para resolver os dados durante a navegação. A interface define um resolve()método que é chamado quando a navegação é iniciada. O roteador espera que os dados sejam resolvidos antes que a rota seja finalmente ativada.
traduzido.

> 

```javascript
interface Resolve<T> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T
}
```

### Implemenação

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
