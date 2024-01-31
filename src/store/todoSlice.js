import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../const";
export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const res = await axios(API);
  return res.data;
});
export const deleteItem = createAsyncThunk(
  "todos/deleteItem",
  async (id, { dispatch }) => {
    try {
      const res = await axios.delete(`${API}/${id}`);
      dispatch(deleteTodo({ id }));
    } catch (error) {
      console.log(error);
    }
  }
);
export const addItem = createAsyncThunk(
  "/todos/addItem",
  async (todoTitle, { dispatch }) => {
    try {
      const newTodo = {
        title: todoTitle,
      };
      const { data } = await axios.post(`${API}`, newTodo);
      dispatch(getTodos());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
);
export const editItem = createAsyncThunk(
  "/todos/editItem",
  async ({ id, newTitle }, { dispatch }) => {
    try {
      const newEditedTodo = {
        title: newTitle,
      };
      const { data } = await axios.patch(`${API}/${id}`, newEditedTodo);
      dispatch(getTodos());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
);
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        title: action.payload.todoTitle,
        id: Date.now(),
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((elem) => elem.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo(state, action) {
      const { id, newTitle } = action.payload;
      const editedTodo = state.todos.find((elem) => elem.id == id);
      editedTodo.title = newTitle;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = "загрузка данных";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "данные успешно загрузились";
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "ошибка при загрузке данных";
        state.error = action.error;
      });
  },
});
export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
