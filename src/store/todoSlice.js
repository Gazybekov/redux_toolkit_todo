import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        title: action.payload.todoTitle,
        id: Date.now(),
      });
    },
    deleteTodo(state, action) {},
  },
});
export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
