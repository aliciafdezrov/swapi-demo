# SWAPI DEMO

![ci status](https://github.com/aliciafdezrov/swapi-demo/actions/workflows/ci.yml/badge.svg)

1. [General info](#general-info)
2. [Technologies](#technologies)
3. [Prerequisites](#prerequisites)
4. [Setup](#setup)
5. [Architecture](#architecture)
6. [Available scripts](#available-scripts)

## General info

Web application that makes API requests to swapi (https://swapi.dev/) and generates a UI for planets and spaceships.

## Technologies

Project is created with:

* React version: 17.0.5
* Typescript version: 4.3.5
* Webpack version: 5.71.0. Custom setting:
    * All project configuration files are located in the ./src/config folder, both webpack configuration files and test
      configuration files. Within the webpack configuration, area we find a series of files:
        - base.webpack.config.js --> It contains all the configuration aspects common to development and production.
        - perf.webpack.config.js --> Runs the analysis of the bundle generated for production.
        - dev.webpack.config.js --> Exclusive configuration for development.
        - pro.webpack.config.js --> Exclusive configuration for production.
* Jest version: 27.0.6
* Cypress version: 9.5.3

## Prerequisites

This project requires the following to run:

* Git - [Download & Install Git](https://git-scm.com/downloads) Download & Install Git. OSX and Linux machines typically
  have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Setup

To run this project, clone and install it locally using npm:

```
$ git clone https://github.com/aliciafdezrov/swapi-demo.git
$ cd /swapi-demo
$ npm install
```

## Architecture

Inside src, by folders:

- **common**. It groups elements common to the whole application that can be used at any point, such as objects to
  define the domain or atomic components that are common and reusable.
- **core**. Basic configuration of the project is done here. This is where the router and other related dependencies
  should be configured.
- **layout**. This is where the common layout styles are stored. This way, if the main style or the background image of
  any page needs to be modified, you would only have to modify said layout.
- **pods**. Each pod contains a complete and functional unit of the project. Within this folder, there is a subfolder
  for each pod and each pod has its own container and specific components.
- **scenes**. This folder corresponds to the individuals screens of the application.

You may recognise the function of each file and the area to which it belongs by its name. This way, there are a number
of different types of files:

- **api**. Contains the necessary requests to any external source of the application.
- **mapper**. Contains domain converters, allowing translation from one domain to a different domain (from any data
  source, either internal or external).
- **style**. SCSS files applied to components.
- **vm**. Domain models.
- **container**. Top pod React component. This is where the dependant logic is usually concentrated. If we'd want to use
  a state management library, this would be the connection point.
- **component**. Generally implements presentation related logic, they never connect to other parts of the
  application/pods other aside from other components and/or their specific container.

# Available scripts

In the project directory, you can run:

Run the app in the development mode:

```
npm start
```

Open http://localhost:8080/#/ to view it in the browser.

The page will reload if you edit the source code. You will also find any lint errors in the console.

Run the app in development mode:

```
npm run start:dev
```

Open http://localhost:8080/#/ to view it in the browser.

You won't see the changes when editing the source code. You will see any lint errors in the console. The bundle is in
memory only.

Run the app in production mode:

```
npm run start:prod
```

Open http://localhost:8080/#/ to view it in the browser. It correctly bundles React in production mode and optimizes the
build for best performance.

The build is minified and the filenames include the hashes. The bundle is in memory only.

Build the app for development and write the bundle to [dist](./dist) folder:

```
npm run build:dev
```

Your app is ready to be deployed in development mode.

Build the app for production and write the bundle to [dist](./dist) folder:

```
npm run build:prod
```

Your app is ready to be deployed in production mode.

Visualize size of webpack output files with an interactive treemap:

```
npm run build:perf
```

You will be able to see what's inside your bundle and further optimize it if you want to.

Launch the test runner for unit tests in the interactive watch mode:

```
npm run test:watch
```

See the section about running tests for more information.

Launch the test runner for unit tests and create a new [coverage](./coverage) folder where you can see the project
coverage:

```
npm run test
```

Launch the interactive suite test runner for the cypress integration test:

```
npm run test:e2e
```

Launch the command runner for the cypress integration test:

```
npm run test:e2e:ci
```

