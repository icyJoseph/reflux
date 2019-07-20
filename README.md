# Reflux

> Similar Approach to Flux

Contructs a bus for your React Components.

The bus is reached through a notification function that takes in a payload and passes it to all bus participants. Each participant interfaces with the bus through a `reducer`. Therefore the payload must be an action, although there is no checks for this in place at the moment.

Since reducers only recalculate for certain actions, it is guaranteed that the participants do not render unnecessarily. The package requires the usage of selectors, and the result of evaluating the reducer state against the selector is memoized. Furthermore, the participants are also memoized!

## About the Implementation

- It uses React Hooks.
- It has next to zero configuration and blends well with React trees.
- One library to provide and consume.
- Smaller API, does not need `combineReducers`.
- Architecture your application more easily without having to think of complex data layers.

## API

Reflux has three APIs.

### Provider

> Higher Order Component

Wrap your application (or a sub-section of it) with a `Provider` to gain access to the Reflux context.

This makes it possible invoke the other two APIs: `useNotify` and `Connect`.

Provider takes in zero props!

```jsx
<Provider>
  <App />
</Provider>
```

### Connect

> React Component

Adds itself as participant to the bus, and feeds new props into its children.

Takes in three props, `reducer`, `initialState` and `selector`.

> It performs heavy memoization.

Since a reducer is used, if the notification coming from the bus does not concern the reducer, the same state is returned. This state is a dependency used on `useMemo` when calculating the result of `selector(state)`.

In turn the result of `selector(state)` is used to memoize the children rendered by Connect.

> The goal is to only render the children again if their selector(state) result has changed

> If the props passed to children change, then we render them again

> Notice that the Context API is not used to broadcast the changes

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

## Road Map

- Study whether or not it makes sense to have async notifications. Hooks allows consumers of the pakcage to configure this easily.

- Use a running flag and buffer notifications. Today every time a notification is sent, the main thread is blocked until all participants are notified.

- Explore performance benchmarks.

- Study whether or not to reimplment the Global Store.

- Study whether or not to allow only one child in Connect or to make turn the it into redux connect.

- One Selector per child?
