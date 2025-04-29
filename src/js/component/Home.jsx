import React, { useState } from "react";

const Home = () => {
  // Estado para la tarea nueva
  const [task, setTask] = useState("");

  // Estado para la lista de tareas
  const [tasks, setTasks] = useState([]);

  // Función para manejar la tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && task.trim() !== "") {
      setTasks([...tasks, task.trim()]);
      setTask(""); // Limpiar el input después de agregar
    }
  };

  // Función para eliminar una tarea
  const removeTask = (indexToRemove) => {
    const updated = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updated); // Actualizar las tareas sin la tarea eliminada
  };

  return (
    <div className="todo-container">
      <h1>todos</h1>
      <div className="task-box">
        <input
          type="text"
          placeholder="Add your task"
          value={task}
          onChange={(e) => setTask(e.target.value)} 
          onKeyDown={handleKeyDown} 
        />

       
        {tasks.length === 0 ? (
          <p className="no-tasks">No hay tareas, añadir tareas</p>
        ) : (
          
          tasks.map((t, i) => (
            <div key={i} className="task">
              {t}
			  <span className="delete" onClick={() => removeTask(i)}>❌</span>
            </div>
          ))
        )}

        
        <div className="counter">
          {tasks.length} {tasks.length === 1 ? "item" : "items"} left
        </div>
      </div>
    </div>
  );
};

export default Home;