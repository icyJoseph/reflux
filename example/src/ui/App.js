import React from "react";

import { useNotify } from "reflux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Header from "./components/Header";
import Container from "./components/Todos";
import TodoCounter from "./components/TodoCounter";
import { MOVE_TODO } from "../reducers/todos";

function handleOnDragEnd(result) {
  const { draggableId: todoId, destination, source } = result;

  if (!destination) return {};

  return {
    type: MOVE_TODO,
    todoId,
    fromStatus: source.droppableId,
    fromIndex: source.index,
    toStatus: destination.droppableId,
    toIndex: destination.index
  };
}

export function App() {
  const notify = useNotify();
  const notifyChangeTodoStatus = e => notify(handleOnDragEnd(e));

  return (
    <div style={{ minHeight: "100vh" }}>
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
