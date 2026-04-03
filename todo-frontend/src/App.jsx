import React from "react";
import { useState, useEffect } from "react";
import api from "./api";
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [description, setDescription] = useState("");

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

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h1>My To-Do List</h1>
      {loading ? (
        <h2>Loading tasks... please wait</h2>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} -{task.completed ? "✅" : "⏳"}
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
  );
}
export default App;
