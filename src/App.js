import React, { useEffect, useState } from "react";
import "./index.css";
import TodoUl from "./components/TodoList";
import { useDispatch } from "react-redux";
import { addItem, getTodos } from "./store/todoSlice";
const App = () => {
  const [todoTitle, setTodoTitle] = useState("");

  const dispatch = useDispatch();
  const handleCLick = () => {
    dispatch(addItem(todoTitle));
    setTodoTitle("");
  };

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <div>
      <div className="container">
        <h1>Todo app</h1>
        <div className="input-field">
          <input
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            type="text"
          />

          <p>TodoName</p>
          <button onClick={handleCLick}>Add</button>
        </div>
      </div>
      <TodoUl />
    </div>
  );
};

export default App;
