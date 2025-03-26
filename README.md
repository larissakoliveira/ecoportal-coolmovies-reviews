# Coolmovies reviews
A responsive page that allows users to view movie reviews and submit new ones, including the movie title, rating, and review text, with a focus on a smooth user experience and accessibility.

## Technologies Used

- Next.js (v15.1.6) – A React framework for building server-rendered and statically generated web applications.
- React (v19.0.0) – A JavaScript library for building user interfaces, used to create dynamic and interactive web applications.
- Redux (v5.0.1) – A state management library for JavaScript applications, used for managing global state across components.
- React Redux (v9.2.0) – Official bindings to use Redux with React.
- GraphQL (v16.10.0) – A query language for APIs, used for data fetching with the Apollo Client.
- Apollo Client (v3.12.10) – A state management library for JavaScript, enabling interaction with GraphQL APIs.
- RxJS (v7.8.1) – A library for reactive programming using Observables, used for asynchronous programming and event handling.
- MUI (Material UI) (v6.4.3) – A popular React UI framework, used for building custom, styled components.
- Emotion (v11.14.0) – A CSS-in-JS library, used for styling React components.
- Redux Observable (v3.0.0-rc.2) – A middleware for Redux, enabling asynchronous action handling using RxJS.
- Jest (v29.7.0) – A testing framework for JavaScript, used for unit and integration testing.
- Testing Library (React, Jest-DOM, User-Event) – A set of utilities for testing React components, making tests more focused on user interactions.
- GraphQL Codegen (v5.0.2) – A tool for generating type-safe GraphQL queries, mutations, and subscriptions.
- TypeScript (v5.7.3) – A superset of JavaScript that adds static typing, improving code quality and development experience.
- ESLint (v9.19.0) – A tool for identifying and fixing problems in JavaScript and TypeScript code, ensuring code quality and consistency.

## API Instructions
In order for this frontend to work, you will need to run the backend, which can be found here along with step-by-step instructions on how to do it.
[Cool Movies Backend](https://github.com/larissakoliveira/coolmovies-ecoportal)

## 🚀 To run

Follow these steps to set up and run the project:

1. **Clone the repository**  
```sh
git clone <repository-url> <project-folder>
cd <project-folder>
```
2. **Install dependencies**  
```sh
yarn install
```
3. **Generate GraphQL types**  
```sh
yarn graphql-types
```
4. **Run the app**  
```sh
yarn dev
```
It will open on:        http://localhost:3000/

### Run the tests
```sh
yarn test
```

**Or run tests in watch mode**  
```sh
yarn test:watch
```

