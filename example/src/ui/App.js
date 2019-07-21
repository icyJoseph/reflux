import React from "react";

import { Connect, useNotify } from "reflux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Header from "./components/Header";
import Container from "./components/Container";
import TodoCounter from "./components/TodoCounter";

export function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "rgb(76, 154, 255)" }}>
      <Header>
        <TodoCounter />
      </Header>
      <DragDropContext onDragEnd={console.log}>
        <Container />
      </DragDropContext>
    </div>
  );
}

export default App;
