import React from "react";
import { deleteTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ title, id }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteTodo({ id }));
  };
  return (
    <div>
      <li className="todo">
        <label>
          <input type="checkbox" />
        </label>
        <p>{title}</p>
        <button>delete</button>
        <button>Edit</button>
      </li>
    </div>
  );
};

export default TodoItem;
