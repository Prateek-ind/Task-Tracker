import EditTask from "./EditTask";
import Stopwatch from "./Stopwatch";
import { useDrag } from "react-dnd";
import { saveTasks } from "../storage";

const ToDo = ({ task, id, tasksList, index, setTasksList, isCompleted }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: id,
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      duration: task.duration,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  function handleDelete(id) {
    const updatedTasksList = tasksList.filter((task) => task.id !== id);
    setTasksList(updatedTasksList);
    saveTasks(updatedTasksList);
  }

  return (
    <div
      className="w-3/4 ml-6 max-w-lg bg-white px-4 py-2  rounded mt-4"
      ref={!isCompleted ? drag : null}
    >
      <div className="flex items-center justify-between my-2">
        <p className="text-sm md:text-xl font-bold">{task.projectName}</p>
        {!isCompleted && (
          <EditTask
            task={task}
            tasksList={tasksList}
            index={index}
            setTasksList={setTasksList}
          />
        )}
      </div>
      <p className="text-xs md:text-lg my-2">{task.taskDescription}</p>
      {!isCompleted && (
        <Stopwatch
          task={task}
          tasksList={tasksList}
          setTasksList={setTasksList}
        />
      )}
      <div className="flex items-center justify-center mt-4">
        <button
          className="bg-red-500 text-white text-sm md:text-lg uppercase
         px-3 py-1.5 rounded-lg my-2 font-semibold  
         shadow-md hover:bg-red-700"
          onClick={() => handleDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDo;
