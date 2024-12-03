CH Marketplace
Project created for a technical test, carried out with [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## How to start

- Download the project 
- Install the project
```bash
npm i
```
- Start the project
```bash
npm run dev
```
- Open browser on [http://localhost:3000](http://localhost:3000)

## Other options
- Unit tests:
```bash
npm run test
#or
npm run test:watch
```
- test e2e
```bash
npm run cy:open
```

## Technical considerations
As a front-end test we have tried to give priority to the product's functionalities and graphical presentation, trying to demonstrate the range of abilities and the use of the different elements offered by react.

An atomic architecture has been used to organise the code and we have tried to take into consideration the most common folder distribution to make the code easier to read.

## Areas for improvement
In terms of testing, we have not tested the whole application but we have selected 7, 8 options to demonstrate the capabilities of unit and e2e/integration testing. 
The drawer was initially going to take a component, but it gave integration problems so we have preferred to make one for the case, although it would have to be perfected to go to production.