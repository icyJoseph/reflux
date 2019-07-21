import React from "react";

import { useNotify } from "reflux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Header from "./components/Header";
import Container from "./components/Todos";
import TodoCounter from "./components/TodoCounter";

import { CHANGE_TODO_STATUS } from "../reducers/todos";

function handleOnDragEnd(result) {
  console.log("onDragEnd", result);
  if (!result.destination || result.destination.droppableId === "main") {
    return {};
  }
  return {
    type: CHANGE_TODO_STATUS,
    todoId: result.draggableId,
    newStatus: result.destination.droppableId,
    newIndex: result.destination.index
  };
}

export function App() {
  const notify = useNotify();
  const notifyChangeTodoStatus = e => notify(handleOnDragEnd(e));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "rgb(76, 154, 255)" }}>
      <Header>
        <TodoCounter />
      </Header>
      <DragDropContext onDragEnd={notifyChangeTodoStatus}>
        <Container />
      </DragDropContext>
    </div>
  );
}

export default App;
