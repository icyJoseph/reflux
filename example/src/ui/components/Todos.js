import React from "react";

import TodoList from "./TodoList";
import { TODO_TYPES } from "../../data/constants";

export function Todos() {
  return (
    <div
      style={{
        display: "inline-flex",
        minWidth: "100vw",
        backgroundColor: "rgb(76, 154, 255)"
      }}
    >
      {TODO_TYPES.map((status, index) => (
        <TodoList key={status} status={status} />
      ))}
    </div>
  );
}

export default Todos;
