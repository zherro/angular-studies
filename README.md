
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
