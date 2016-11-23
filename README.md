# ng-admin-custom-seed
Structure to define ng-admin based apps. It adapts according to every project.

## Pre-requisites

In order to create a new project you need you have installed the following software in your computer:

- [NodeJs](https://nodejs.org/es/)
- [Make](https://www.gnu.org/software/make/)
- [Bower](https://bower.io/)

```bash

$ npm install -g bower

```

- [WebPack](https://webpack.js.org/)

```bash

$ npm install -g webpack

```

## Installation

1. Clone de repo

  ```bash

  $ git clone https://github.com/Jacodom/ng-admin-custom-seed.git

  ```

2. Go to the project folder

  ```bash

  $ cd ng-admin-custom-seed

  ```

3. Install backend and frontend dependencies

  ```bash

  $ npm install && bower install

  ```

  or

  ```bash

  $ make install

  ```

4. Build the ng-admin components and the styles of the apps

  ```bash

  $ make build

  ```

5. Start the app

  ```bash

  $ make start

  ```

  *PRO-TIP:*

  ```bash

  $ make doall

  ```

  runs all the tasks

6. Check out the app in http://localhost:3000
