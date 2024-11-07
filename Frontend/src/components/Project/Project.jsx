import { useEffect, useState } from "react";
import { TodoProvider } from "../../Context";
import TodoForm from "../TodoForm";
import TodoItem from "../TodoItem";
import axios from "axios";

function Project() {
  const [todos, setTodos] = useState([]);

  const addTodo = async (todo) => {
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/todos/", { title: todo });
      setTodos((prev) => [...prev, response.data]); 
    } catch (error) {
      console.log(error.message);
    }
  };

  const update = async (id, todo) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/todos/${id}/`, todo);
      setTodos((prev) =>
        prev.map((prevtodo) => (prevtodo.id === id ? { ...prevtodo, ...todo } : prevtodo))
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    try {
      await axios.patch(`http://127.0.0.1:8000/api/todos/${id}/`, {
        completed: !todo.completed,
      });
      setTodos((prev) =>
        prev.map((prevtodo) =>
          prevtodo.id === id ? { ...prevtodo, completed: !prevtodo.completed } : prevtodo
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/todos/");
        setTodos(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getdata();
  }, []);

  return (
    <TodoProvider value={{ todos, addTodo, update, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default Project;
