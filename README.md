# express-mongoose-es8-rest-api

## Description
Nodejs boilerplate with express,Mongoose,ES8,Jwt to develop rest api

[![specification](https://img.shields.io/badge/ES8/ECMASCRIPT-2017-yellow.svg)](https://www.ecma-international.org/ecma-262/8.0/index.html)
![node version](https://img.shields.io/badge/node-%3E%3D%208.10.0-brightgreen.svg)
[![express](https://img.shields.io/badge/express-4.x-orange.svg)](https://github.com/expressjs/express)
[![mongoose](https://img.shields.io/badge/mongoose-5.4.12-red.svg)](https://mongoosejs.com/)
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-8.4.0-green.svg)](https://github.com/auth0/node-jsonwebtoken)
[![code style](https://img.shields.io/badge/eslint--config--standard-%5E12.0.0-blue.svg)](https://github.com/standard/eslint-config-standard)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)

## Features
- ES8 supported via [babel](https://github.com/babel/babel) 7.*
- Authentication via JWT with dynamic secret per user
- Jwt middleware for authenticated routes management
- Request validation using [joi](https://github.com/hapijs/joi)
- async-await with single try catch throughout routes using asyncWrapper
- Code [linting](http://eslint.org) using [standard](https://github.com/standard/standard) and pre commit git hooks using [husky](https://github.com/typicode/husky)
- Integration test using [mocha](https://github.com/mochajs/mocha),[chai](https://github.com/chaijs/chai),[chai-http](https://github.com/chaijs/chai-http)
- Auto server start using [nodemon](https://github.com/remy/nodemon)
- uses [yarn](https://yarnpkg.com) over [npm](https://www.npmjs.com/)
- Application level errorHandler 
- Manage enviroment via [dotenv](https://github.com/rolodato/dotenv-safe)

## Getting Started
1. Clone repository
``` 
git clone https://github.com/vibhasfl/nodejs-mongoose-es8-rest-api.git 
cd nodejs-mongoose-es8-rest-api
```
2. Install yarn 
``` 
npm i -g yarn 
```
3. Install project dependencies
```
yarn
```
4. Set enviroment variables
```
cp .env.sample .env
```
5. Run application
``` 
yarn dev OR npm run dev
```





