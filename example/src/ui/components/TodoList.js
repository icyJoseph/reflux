import React from "react";

import { Droppable } from "react-beautiful-dnd";

import Todo from "./Todo";

export function TodoList({ status, todos = [] }) {
  const sortedTodos = todos.sort((a, b) => a.index - b.index);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        margin: "8px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>{status}</div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <>
            <div
              ref={provided.innerRef}
              style={{ minHeight: "250px", paddingBottom: "8px" }}
              {...provided.droppableProps}
            >
              {sortedTodos.map(({ id, index, ...todo }) => (
                <Todo key={id} id={id} index={index} {...todo} />
              ))}
            </div>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </div>
  );
}

export default TodoList;
