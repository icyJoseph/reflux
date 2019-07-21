// Actions Types
export const ADD_TODO = "add-todo";
export const REMOVE_TODO = "remove-todo";
export const CHANGE_TODO_STATUS = "change-todo-status";

// Actions
export const addTodo = todo => ({ type: ADD_TODO, todo });
export const removeTodo = todo => ({ type: REMOVE_TODO, todo });
export const changeTodoStatus = (todo, newStatus) => ({
  type: CHANGE_TODO_STATUS,
  todoId,
  newStatus,
  newIndex
});

export function reducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, todo];
    case REMOVE_TODO:
      return state.filter(todo => todo !== action.todo.id);
    case CHANGE_TODO_STATUS:
      const index = state.findIndex(todo => todo.id === action.todoId); // find location
      const [todo = {}] = state.slice(index, index + 1); // safely copy the todo from state
      const displacedIndex = state.findIndex(
        todo =>
          todo.status === action.newStatus && todo.index === action.newIndex
      ); // are we switching places with a todo?

      const [displacedTodo = {}] = state.slice(
        displacedIndex,
        displacedIndex + 1
      );
      const result = state.slice(0); // copy the state
      /* Mutation on result */
      result.splice(index, 1, {
        ...todo,
        status: action.newStatus,
        index: action.newIndex
      }); // update todo by using splice to remove and replace
      if (displacedIndex > -1) {
        result.splice(displacedIndex, 1, {
          ...displacedTodo,
          index: todo.index
        });
      }
      return result;
    default:
      return state;
  }
}

export default reducer;
