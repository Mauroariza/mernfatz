import axios from "./axios";

export const getTasksRequest = async () => axios.get("/tasks");

export const createTaskRequest = async (task) => axios.post("/tasks", task);

export const updateTaskRequest = async (_id,task) => //agregué el id como parámetro porque no lo tenía
  axios.put(`/tasks/${_id}`, task); //modifiqué el id, ya que antes era task._id y task no tenía id
//La función updateTaskRequest se utiliza para actualizar una tarea existente en el backend.
export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`); //esta función se utiliza para obtener una tarea existente en el backend.
//el id de getTaskRequest es el id de la tarea que queremos obtener del backend y viene de la ruta de la tarea en el backend.




/*  
CreateTaskRequest se crea aquí en API, pero se utiliza en la función createTask de tasksContext
y createTask se utiliza dentro de onSubmit en TaskFormPage si hay un id en la ruta,

Por otro lado updateTaskRequest se crea aquí en API, pero se utiliza dentro de la función 
updateTask de tasksContext. Y updateTask se utiliza dentro de onSubmit en TaskFormPage si no hay
una id en la ruta. 

recordar que el onSubmit es una función personalizada que se utiliza en handleSubmit que viene
dentro de react hook form. 




*/