import { NEW, ONGOING, REVIEW, DONE } from "../data/constants";

// Actions Types
export const MOVE_TODO = "move-todo";
export const CHANGE_TODO_STATUS = "change-todo-status";

export function reducer(state, action) {
  switch (action.type) {
    case MOVE_TODO:
      const todo = state[action.todoId];
      const newTodo = {
        ...todo,
        status: action.toStatus,
        index: action.toIndex
      };

      const onSameIndexAndStatus = Object.values(state).find(
        todo => todo.index === action.toIndex && todo.status === action.toStatus
      );

      if (onSameIndexAndStatus) {
        return {
          ...state,
          [todo.id]: newTodo,
          [onSameIndexAndStatus.id]: {
            ...onSameIndexAndStatus,
            index: action.fromIndex
          }
        };
      }

      return { ...state, [todo.id]: newTodo };
    default:
      return state;
  }
}

export default reducer;
