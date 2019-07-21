import React from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";

import TodoList from "./TodoList";
import { TODO_TYPES } from "../../data/constants";

// renders a TodoList for each status in STATUSES
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
              <Draggable key={status} draggableId={`${status}`} index={index}>
                {(
                  { innerRef, droppableProps, dragHandleProps, placeholder },
                  snapshot
                ) => (
                  <>
                    <TodoList
                      ref={innerRef}
                      droppableProps={droppableProps}
                      dragHandleProps={dragHandleProps}
                      status={status}
                    />
                    {placeholder}
                  </>
                )}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </>
      )}
    </Droppable>
  );
}

export default Todos;
