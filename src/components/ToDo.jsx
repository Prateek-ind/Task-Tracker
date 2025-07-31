import React, { useEffect, useRef, useState } from "react";
import EditTask from "./EditTask";
import Stopwatch from "./Stopwatch";
import { useDrag } from "react-dnd";

const ToDo = ({ task, id, tasksList, index, setTasksList }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  function handleDelete(id) {
    const updatedTasksList = tasksList.filter((task) => task.id !== id);
    setTasksList(updatedTasksList);
  }

  return (
    <div className="w-1/3 p-6 m-4 rounded border-slate-400 bg-white" ref={drag}>
      <div className="flex items-center justify-between my-2">
        <p className="text-xl font-bold">{task.projectName}</p>
        <EditTask
          task={task}
          tasksList={tasksList}
          index={index}
          setTasksList={setTasksList}
        />
      </div>
      <p className="my-2">{task.taskDescription}</p>
      <Stopwatch
        task={task}
        tasksList={tasksList}
        setTasksList={setTasksList}
      />
      <div className="flex items-center justify-center mt-4">
        <button
          className="bg-red-500 text-sm text-white uppercase
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
