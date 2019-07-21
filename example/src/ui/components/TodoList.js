import React from "react";

import Todo from "./Todo";
import { Droppable } from "react-beautiful-dnd";

const fakeTodos = [
  {
    id: "a",
    title: "a",
    description: "description-a",
    createdAt: "a",
    status: "a",
    finishedAt: "a"
  },
  {
    id: "b",
    title: "a",
    description: "description-a",
    createdAt: "a",
    status: "a",
    finishedAt: "a"
  }
];

export function TodoList({ status, dndRef, droppableProps }) {
  const todos = [...fakeTodos]; // should come from reducer or props
  return (
    <div
      ref={dndRef}
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        margin: "8px"
      }}
      {...droppableProps}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>{status}</div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <>
            <div
              ref={provided.innerRef}
              style={{ minHeight: "250px", paddingBottom: "8px" }}
            >
              {todos.map(({ id, ...todo }, index) => (
                <Todo
                  key={`${id}${status}`}
                  id={`${id}${status}`}
                  index={index}
                  {...todo}
                />
              ))}
            </div>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </div>
  );
}

export default React.forwardRef((props, ref) => (
  <TodoList dndRef={ref} {...props} />
));
