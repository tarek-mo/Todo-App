import React, { FormEvent, useState, useEffect, useLayoutEffect } from "react";
import { ITodo } from "./interfaces";
import { v4 } from "uuid";
import Header from "./components/Header";
import "./App.css";
import Todo from "./components/Todo";
import TodosFooter from "./components/TodosFooter";
function App() {
  const [completed, setCompleted] = useState<boolean>(false);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todosFilter, setTodosFilter] = useState<string>("All");
  const [todosList, setTodosList] = useState<ITodo[]>([]);
  // const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const items = localStorage.getItem("TODOS");
    if (!items) return;
    const parsedItems = JSON.parse(items);
    console.log("items", parsedItems);

    switch (todosFilter) {
      case "All":
        setTodosList(parsedItems);
        break;
      case "Active":
        setTodosList(parsedItems.filter((todo: ITodo) => !todo.completed));
        break;
      case "Completed":
        setTodosList(parsedItems.filter((todo: ITodo) => todo.completed));
        break;
      default:
        break;
    }
  }, [todosFilter]);

  // useEffect(() => {
  //   if (todosList && todosList.length > 0) {
  //     localStorage.setItem("TODOS", JSON.stringify(todosList));
  //   }
  // }, [todosList]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const newTodo = {
      id: v4(),
      title: todoTitle,
      completed,
    };

    setTodosList((prevTodos) => {
      const newTodos = [...prevTodos, newTodo];
      localStorage.setItem("TODOS", JSON.stringify(newTodos));
      return newTodos;
    });

    setTodoTitle("");
    setCompleted(false);
  };

  return (
    <>
      <div className="bg-container">
        <div className="container">
          <Header />
          <form onSubmit={(e) => handleSubmit(e)} className="input-container">
            <input
              onChange={() => setCompleted(!completed)}
              checked={completed}
              type="checkbox"
              name="completed"
            />
            <input
              className="todo-input"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              placeholder="Create a new todo..."
              type="text"
              name="todoTitle"
            />
            <input type="submit" />
          </form>
        </div>
      </div>
      <div className="container">
        <div className="todos-container">
          {todosList.map((todo: ITodo) => (
            <Todo key={todo.id} todo={todo} setTodosList={setTodosList} />
          ))}
          {todosList?.length > 0 && (
            <TodosFooter
              todosFilter={todosFilter}
              todosList={todosList}
              setTodosFilter={setTodosFilter}
              setTodosList={setTodosList}
            />
          )}
        </div>
      </div>
      <button
        onClick={() => {
          console.log(
            "local todo list",
            todosList,
            "storage todolist",
            JSON.parse(localStorage.getItem("TODOS") || "hello")
          );
        }}
      >
        Click moi
      </button>
    </>
  );
}

export default App;
