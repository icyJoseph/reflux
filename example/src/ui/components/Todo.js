import React from "react";

import { Draggable } from "react-beautiful-dnd";

export function Todo({
  index,
  id,
  title,
  description,
  createdAt,
  status,
  finishedAt
}) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: "rgb(235, 236, 240)",
              display: "flex",
              flexDirection: "column",
              opacity: "inherit",
              userSelect: "none",
              width: "250px",
              padding: "8px 8px 0px",
              transition: "background-color 0.2s ease 0s, opacity 0.1s ease 0s"
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>{title}</div>
            <div>{description}</div>
          </div>
          {provided.placeholder}
        </>
      )}
    </Draggable>
  );
}

export default Todo;
