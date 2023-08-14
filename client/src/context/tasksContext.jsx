import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => { // esta función es llamada en TasksPage y sirve para obtener todas las tareas del usuario
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => { // se llama en TaskFormPage para crear
    try {
      const res = await createTaskRequest(task);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
//getTask y updateTask son funciones que se utilizan en TaskFormPage para obtener los detalles de una tarea y para actualizar una tarea respectivamente
  const getTask = async (id) => { //este id viene de los parámetros de la url detectados en taskFormPage
    try {
      const res = await getTaskRequest(id); //esta función es creada en api/tasks.js
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => { //esta función es llamada en TaskFormPage para actualizar
    try {
      await updateTaskRequest(id, task); //esta función es creada en api/tasks.js y recibe el id de la tarea y el objeto con los datos de la tarea
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
