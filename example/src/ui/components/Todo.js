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
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              style={{
                backgroundColor: "rgb(235, 236, 240)",
                display: "flex",
                margin: "0.5em",
                flexDirection: "column",
                padding: "8px 8px 0px",
                color: "#282828"
              }}
            >
              <div>{title}</div>
              <div>{description}</div>
            </div>
          </div>
          {provided.placeholder}
        </>
      )}
    </Draggable>
  );
}

export default Todo;
