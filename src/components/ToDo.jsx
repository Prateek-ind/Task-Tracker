import React, { useEffect, useRef, useState } from "react";
import EditTask from "./EditTask";
import Stopwatch from "./Stopwatch";

const ToDo = ({ task, id, tasksList, index, setTasksList }) => {
 
 

  function handleDelete(id) {
    const updatedTasksList = tasksList.filter((task) => task.id !== id);
    setTasksList(updatedTasksList);
  }
 
  return (
    <div className="w-1/3 p-6 m-4 rounded border-slate-400 bg-white">
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
      <Stopwatch/>
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
