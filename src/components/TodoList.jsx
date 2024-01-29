import React from "react";
import TodoLi from "./TodoItem";
import { useSelector } from "react-redux";
const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  console.log(todos);
  return (
    <div>
      <ul>
        {todos.map((elem) => (
          <TodoLi key={elem.id} {...elem} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
