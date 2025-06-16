import React, { useState, useEffect } from "react";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/danigraphic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(resp => {
      if (!resp.ok) {
        console.error("Error al crear usuario");
      }
    });
  }, []);

  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/danigraphic")
      .then(resp => resp.json())
      .then(data => {
        if (Array.isArray(data.todos)) {
          setTasks(data.todos);
        }
      })
      .catch(error => {
        console.error("Error al obtener tareas", error);
      });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && task.trim() !== "") {
      const newTask = {
        label: task.trim(),
        done: false
      };

      fetch("https://playground.4geeks.com/todo/todos/danigraphic", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(() => {
          setTask("");
          fetch("https://playground.4geeks.com/todo/users/danigraphic")
            .then(resp => resp.json())
            .then(data => setTasks(data.todos));
        })
        .catch(error => console.error("Error al agregar tarea", error));
    }
  };

  const handleDelete = (taskId) => {
    fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
      method: "DELETE"
    })
      .then(() => {
        fetch("https://playground.4geeks.com/todo/users/danigraphic")
          .then(resp => resp.json())
          .then(data => setTasks(data.todos));
      })
      .catch(error => console.error("Error al eliminar tarea", error));
  };

  const handleClearAll = () => {
    fetch("https://playground.4geeks.com/todo/users/danigraphic", {
      method: "DELETE"
    })
      .then(() => setTasks([]))
      .catch(error => console.error("Error al limpiar tareas", error));
  };

  return (
    <div className="todo-container">
      <h1>todos</h1>
      <input
        type="text"
        placeholder="Add your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="task-box">
        {tasks.length === 0 ? (
          <div className="no-tasks">No hay tareas, añadir tareas</div>
        ) : (
          tasks.map((item) => (
            <div key={item.id} className="task">
              <span>{item.label}</span>
              <span className="delete" onClick={() => handleDelete(item.id)}>
                ✕
              </span>
            </div>
          ))
        )}
      </div>
      <div className="counter">{tasks.length} item{tasks.length !== 1 ? "s" : ""} left</div>
      <button
        onClick={handleClearAll}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#ff6b6b",
          color: "#fff",
          border: "none",
          borderRadius: "30px",
          fontSize: "14px",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
        }}
      >
        🗑️ Limpiar todas las tareas
      </button>
    </div>
  );
};

export default Home;
