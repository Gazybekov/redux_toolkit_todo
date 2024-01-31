import React, { useState } from "react";
import { deleteItem, editItem } from "../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ title, id }) => {
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useDispatch();
  const handleClickSave = () => {
    dispatch(editItem({ id, newTitle }));
    setEditId(null);
  };
  return (
    <div>
      <li className="todo">
        <label>
          {editId == id ? (
            <div>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                type="text"
              />
            </div>
          ) : (
            <p>{title}</p>
          )}
          {editId == id ? (
            <div>
              <button onClick={handleClickSave}>Save</button>
            </div>
          ) : (
            <div>
              <button onClick={() => dispatch(deleteItem(id))}>delete</button>
              <button onClick={() => setEditId(id)}>Edit</button>
            </div>
          )}
          <input type="checkbox" />
        </label>
      </li>
    </div>
  );
};

export default TodoItem;
