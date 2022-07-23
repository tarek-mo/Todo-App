import React, { useRef } from "react";
import { ITodo } from "../interfaces";
import crossIcon from "../images/icon-cross.svg";
interface Props {
  todo: ITodo;
  setTodosList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}
const Todo = ({ todo, setTodosList }: Props) => {
  const todoContainerRef = useRef<HTMLDivElement>(null);
  const handleChange = (): void => {
    setTodosList((prevTodos) => {
      const editedTodos = prevTodos.map((t) => {
        if (t.id === todo.id) {
          return { ...t, completed: !todo.completed };
        } else {
          return t;
        }
      });
      localStorage.setItem("TODOS", JSON.stringify(editedTodos));
      return editedTodos;
    });
    todoContainerRef.current?.classList.toggle("completed");
  };

  const deleteTodo = (): void => {
    setTodosList((prevTodos) => {
      const remainingTodos = prevTodos.filter((t) => t.id !== todo.id);
      localStorage.setItem("TODOS", JSON.stringify(remainingTodos));
      return remainingTodos;
    });
  };

  return (
    <div ref={todoContainerRef} className="todo-container">
      <div className="flex">
        <input
          onChange={() => handleChange()}
          checked={todo.completed}
          type="checkbox"
          name="completed"
        />
        <p>{todo.title}</p>
      </div>
      <button onClick={deleteTodo}>
        <img src={crossIcon} alt="Cross Button" />
      </button>
    </div>
  );
};

export default Todo;
