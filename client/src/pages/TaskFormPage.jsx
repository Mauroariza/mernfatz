import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams(); //params equivale al objeto en sí, se podría usar la desestructuración {id}  para obtener el id de los parámetros de la url 
  const {
    
    register,   /* register se utiliza para ir actualizando el valor de los inputs */
    setValue, /* el hook form utiliza setValue para actualizar los valores del estado local del formulario
    pero ese estado local está siendo gestionado por 'react-hook-form y no directamente por React en sí  */
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => { // data aquí es un objeto que contiene los valores de los inputs del formulario, gracias a register
    try {
      if (params.id) {
        updateTask(params.id, { //esta función se crea en el componente tasksContext y lleva dentro a updateTaskRequest
          ...data, //se copian todas las propidades de data al objeto que se está pasando como argumento a updateTask
          date: dayjs.utc(data.date).format(),
          
        });
        navigate('/tasks');
        console.log(params.id,data)
      } else {
        createTask({ //ceateTask se crea en taskContext y lleva a createTaskRequest dentro, quien se comunica con el backend
          ...data,
          date: dayjs.utc(data.date).format(),
        });
        navigate('/tasks');
      }

    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {  /*  carga detalles de una tarea cuando se intenta editar*/
    const loadTask = async () => { 
      if (params.id) { // si hay un id en los parámetros de la url, significa que el usuario está intentando editar una tarea
        const task = await getTask(params.id); //getTask consigue los datos de la función ya existente
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
       // setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        <Button>Save</Button>
      </form>
    </Card>
  );
}


/* 

  FUNCIONAMIENTO DE onSubmit
 cuando estoy en una ruta que tiene un id ( indicando que estoy en una tarea existente), el código verifica la presencia
 de ese id con el condicional if(params.id). Si el id existe, significa que estás editando una tarea y no creando una nueva.
 En dicho caso, se ejecuta la función updateTask dentro de TaskFormPage. Esta función toma el id de la tarea que se está editando y 
 los datos actualizados del formulario.Luego, updateTask se comunica con el backend para actualizar la tarea correspondiente en la base
 de datos con esos datos actualizados.

 SETVALUE
 esta propiedad de react hook form se utiliza cuando quiero precargar valores de los campos de un formulario.
 En el caso de este archivo, permite mostrar el formulario sin valores precargados o utilizar el formulario
 sin valores en el caso de que se esté creando una nueva tarea. 
 







*/