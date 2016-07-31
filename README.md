# LegoRemote WebApp

This WebApp can control (Lego) remote controllable cars using this: https://github.com/devmil/remotelego

A deployed version of this WebApp is reachable through https://devmil.github.io/remotelego_app/

## Preparation
For the client beeing able to use this WebApp some preconditions have to be met (limited by WebBluetooth):
- Works only on Chrome
- currently supported operating systems:  Android 6+, Chrome OS or Linux

For getting informed about a nearby car that is remote controllable via this WebApp (or: to get the PhysicalWeb working on your device) you have to additionally:

**Android**
- enable "Nearby discoveries" under Settings->Google->Nearby discoveries
- or: use the Physical Web app from the PlayStore (https://play.google.com/store/apps/details?id=physical_web.org.physicalweb)

# Angular CLI information

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.6.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/route/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
