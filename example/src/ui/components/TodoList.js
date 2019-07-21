import React from "react";

import { Droppable } from "react-beautiful-dnd";
import { useConnect } from "reflux";

import reducer from "../../reducers/todos";

import Todo from "./Todo";

import initialState from "../../data/mock";

const selectTodosByStatus = listStatus => state =>
  state
    .filter(({ status }) => status === listStatus)
    .sort((a, b) => a.index - b.index);

export function TodoList({ status, dndRef, droppableProps, dragHandleProps }) {
  const selector = React.useCallback(selectTodosByStatus(status), [status]);
  const todos = useConnect({ reducer, initialState, selector }); // bad pattern, creates 4 reducers :D
  console.log(todos);

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
      {...dragHandleProps}
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
              {todos.map(({ id, ...todo }, index) => (
                <Todo key={`${id}${status}`} id={id} index={index} {...todo} />
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
