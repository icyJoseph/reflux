import React from "react";

import { useConnect } from "reflux";
import TodoList from "./TodoList";
import reducer from "../../reducers/todos";
import initialState from "../../data/mock";
import {
  TODO_TYPES,
  LOCAL_STORAGE_KEY,
  EMPTY_LOCAL_STORAGE
} from "../../data/constants";

function selector(state) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  return Object.values(state);
}

function getInitialState(initialState) {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY) || EMPTY_LOCAL_STORAGE;
  if (stored === EMPTY_LOCAL_STORAGE) return initialState;
  return JSON.parse(stored);
}

export function Todos() {
  const allTodos = useConnect(reducer, initialState, selector, getInitialState);

  return (
    <div
      style={{
        display: "inline-flex",
        minWidth: "100vw",
        backgroundColor: "rgb(76, 154, 255)"
      }}
    >
      {TODO_TYPES.map((status, index) => (
        <TodoList
          key={status}
          status={status}
          todos={allTodos.filter(todos => todos.status === status)}
        />
      ))}
    </div>
  );
}

export default Todos;
