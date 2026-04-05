import React from "react";
import { useState, useEffect } from "react";
import Login from "./Login";
import api from "./api";
import Signup from "./Signup";
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [view, setView] = useState("login");

  const handleLoginSuccess = () => {
    setToken(localStorage.getItem("token"));
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const addTask = () => {
    const newTask = {
      title: newTaskTitle,
      description: description,
    };
    api
      .post("tasks/", newTask)
      .then((response) => {
        console.log("Success:", response.data);
        setTasks([...tasks, response.data]);
        setNewTaskTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.log("Erroor adding task:", error);
      });
  };

  const deleteTask = (id) => {
    api
      .delete(`tasks/${id}/`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id != id);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const toggleTask = (task) => {
    api
      .patch(`tasks/${task.id}/`, {
        completed: !task.completed,
      })
      .then((response) => {
        const updatedList = tasks.map((item) =>
          item.id === task.id ? response.data : item,
        );
        setTasks(updatedList);
      })
      .catch((error) => {
        console.error("Error updating task;", error);
      });
  };
  useEffect(() => {
    if (token) {
      api
        .get("tasks/")
        .then((response) => {
          console.log(response);
          setTasks(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [token]);
  return (
    <div>
      {token ? (
        <div>
          <h1>My To-Do List</h1>
          <button onClick={handleLogout}>Logout</button>
          {loading ? (
            <h2>Loading tasks... please wait</h2>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  {task.title} -{task.completed ? "✅" : "⏳"}
                  {task.description}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                  />
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
          <div>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task... "
            />
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task..."
            ></textarea>
            <button onClick={addTask}>Add task</button>
          </div>
        </div>
      ) : (
        <div>
          {view === "login" ? (
            <>
              <Login onLoginSuccess={handleLoginSuccess} />
              <p>
                Create account
                <button onClick={() => setView("signup")}>Signup</button>
              </p>
            </>
          ) : (
            <>
              <Signup onSignupSuccess={() => setView("login")} />
              <p>
                Already have an account?
                <button onClick={() => setView("login")}>
                  Switch to Login
                </button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default App;
