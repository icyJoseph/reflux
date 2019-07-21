import React from "react";

import { useConnect } from "reflux";
import TodoList from "./TodoList";
import reducer from "../../reducers/todos";
import initialState from "../../data/mock";
import { TODO_TYPES } from "../../data/constants";

export function Todos() {
  const allTodos = useConnect({
    reducer,
    initialState,
    selector: state => Object.values(state)
  });

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
