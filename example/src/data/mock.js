import { NEW, ONGOING, REVIEW, DONE } from "./constants";

const initialTodoState = {
  a: {
    id: "a",
    index: 0,
    title: "Study Rust",
    description: "Read more up on Rust",
    createdAt: 1563723692632,
    status: NEW,
    finishedAt: null
  },
  b: {
    id: "b",
    index: 1,
    title: "CSS Animations",
    description: "Check out some animations",
    createdAt: 1563723683321,
    status: NEW,
    finishedAt: null
  }
};

export default initialTodoState;
