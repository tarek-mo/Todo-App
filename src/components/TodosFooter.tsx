import React from "react";
import { ITodo } from "../interfaces";

interface Props {
  todosList: ITodo[];
  setTodosFilter: React.Dispatch<React.SetStateAction<string>>;
  setTodosList: React.Dispatch<React.SetStateAction<ITodo[]>>;

  todosFilter: string;
}
const TodosFooter = ({
  todosList,
  setTodosFilter,
  todosFilter,
  setTodosList,
}: Props) => {
  const unCompletedTodos = todosList.filter((t) => !t.completed);
  const clearCompletedTodos = (): void => {
    setTodosList((prevTodos) => {
      const unCompleted = prevTodos.filter((t) => !t.completed);
      localStorage.setItem("TODOS", JSON.stringify(unCompleted));
      return unCompleted;
    });
  };
  return (
    <div className="todos-footer">
      <p className="items-left">{unCompletedTodos.length} items left</p>
      <ul>
        <li>
          <button
            className={todosFilter === "All" ? "active" : ""}
            onClick={() => setTodosFilter("All")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={todosFilter === "Active" ? "active" : ""}
            onClick={() => setTodosFilter("Active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={todosFilter === "Completed" ? "active" : ""}
            onClick={() => setTodosFilter("Completed")}
          >
            Completed
          </button>
        </li>
      </ul>
      <button onClick={() => clearCompletedTodos()}>Clear Completed</button>
    </div>
  );
};

export default TodosFooter;
