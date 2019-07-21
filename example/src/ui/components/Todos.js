import React from "react";

import { Droppable } from "react-beautiful-dnd";

import TodoList from "./TodoList";
import { TODO_TYPES } from "../../data/constants";

export function Todos() {
  return (
    <Droppable droppableId="main">
      {(provided, snapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
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
          {provided.placeholder}
        </>
      )}
    </Droppable>
  );
}

export default Todos;
