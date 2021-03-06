# Reflux

> Playing around ⚗🧪⚛️

Contructs a bus for your React Components.

> Similar Approach to Flux

The bus is reached through a notification function that takes in a payload and passes it to all bus participants. Each participant interfaces with the bus through a `reducer`. Therefore the payload must be an action, although there is no checks for this in place at the moment.

Since reducers only recalculate for certain actions, it is guaranteed that the participants do not render unnecessarily. The package requires the usage of selectors, and the result of evaluating the reducer state against the selector is memoized. Furthermore, the participants are also memoized!

## Road Map

Order in highest priority:

- ~~Refine the API. Should Connect be a HoC at all? Perhaps all of the API should be based on Hooks.~~

> A new API has been defined, for now named `useConnect`

- Study whether or not it makes sense to have async notifications. Hooks allows consumers of the package to configure this easily.

- Use a running flag and buffer notifications. Today every time a notification is sent, the main thread is blocked until all participants are notified.

- Explore performance benchmarks.

- Study whether or not to reimplment the Global Store.

- ~~Study whether or not to allow only one child in Connect or to make turn the it into redux connect.~~

- ~~One Selector per child?~~

## About the Implementation

- It uses React Hooks.
- It has next to zero configuration and blends well with React trees.
- One library to provide and consume.
- Smaller API, does not need `combineReducers`.
- Architecture your application more easily without having to think of complex data layers.

## API

Reflux has four APIs.

### Provider

> Higher Order Component

Wrap your application (or a sub-section of it) with a `Provider` to gain access to the Reflux context.

This makes it possible invoke the other two APIs: `useNotify` and `useConnect`.

Provider takes in zero props!

```jsx
<Provider>
  <App />
</Provider>
```

### useConnect

Provides a React hook, the result of which is heavily memoized.

```js
const result = useConnect(reduer, initialState, selector, initializer);
```

The selector and initializer are optional. They default to indentity function.

The reducer and initialState are mandatory. Under special circumstances the initialState could be undefined.

The `useReducer` hook used internally, lazily initializes the reducer when the initializer is present. The initializer takes in the initialState as argument and outputs the actual initial state of the reducer. As long as you return valid state from the initializer, then the initialState could be undefined.

### useNotify

Returns a function which must be called with an plain object, containing at least a type.

This object is broadcasted through the bus to all participants' reducers. The function never changes reference. It does not trigger rendering after broadcasting.

## Usage

As usual, wrap your root node with a Provider.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "reflux";
import App from "./App";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

Unlike Redux, there is no need to pass a store, or any sort of reducer at this point. The provider exists to give your the React tree access to a Context in which it is possible to add participants and notify them.
