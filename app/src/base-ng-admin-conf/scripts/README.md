# About this folder

Here is where all the .js files of the module are placed. The files are separated in folders according to their functionality in a typical angular app.

```
scripts
|----config
        |--- config.js
|----controllers
        |--- example-controller.js
|----directives
        |--- example-directive.js
|----services
        |--- example-service.js
|----states
        |--- state.js

```

- **config:** it is mandatory to have a _config.js_ file to setup the different characteristics of the module and _ng-admin_. Ej: define the _listViews_ and _fields_

- **controllers:** if is necessary, you could add custom controllers to extend _ng-admin_ functionality. You must add your controllers files here.

- **directives:** if you need special directives for your module, here is where your .js files have to be placed.

- **services:** here is where all your services and factories should be placed.

- **states:** in case that you have to declare specials states or routes, here you can define it with a _state.js_ file.

**Note:** all this files must be imported in the main.js file of the app. For further documentation on how to do it, just check that file. 
