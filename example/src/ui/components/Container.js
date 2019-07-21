import React from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";

import TodoList from "./TodoList";

const STATUSES = ["new", "ongoing", "review", "done"];

// renders a TodoList for each status in STATUSES
export function Container() {
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
            {STATUSES.map((status, index) => (
              <Draggable key={status} draggableId={`${status}`} index={index}>
                {({ innerRef, droppableProps, placeholder }, snapshot) => (
                  <>
                    <TodoList
                      ref={innerRef}
                      droppableProps={droppableProps}
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

export default Container;
