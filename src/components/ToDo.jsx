import React, { useEffect, useRef, useState } from "react";
import EditTask from "./EditTask";

const ToDo = ({ task, id, tasksList, index, setTasksList }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimerRef = useRef(0);
  const timerIdRef = useRef();

  useEffect(() => {
    if (isRunning) {
      timerIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimerRef.current);
      }, 1000);
    } else {
      clearInterval(timerIdRef.current);
    }
    return () => {
      clearInterval(timerIdRef.current);
    };
  }, [isRunning]);

  function handleStart() {
    setIsRunning(true);
    startTimerRef.current = Date.now() - elapsedTime;
  }
  function handlePause() {
    setIsRunning(false);
  }

  function handleStop() {
    setIsRunning(false);
    clearInterval(timerIdRef.current);
    startTimerRef.current = 0;
    setElapsedTime(0);
  }

  function handleDelete(id) {
    const updatedTasksList = tasksList.filter((task) => task.id !== id);
    setTasksList(updatedTasksList);
  }
  function handleTimer(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    let seconds = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
    console.log(hours, minutes, seconds);
    return `${hours}:${minutes}:${seconds}`;
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
      <div className="my-2 px-4 flex items-center justify-center flex-col md:flex-row gap-4">
        <div className=" text-xl font-semibold">{handleTimer(elapsedTime)}</div>
        <button
          className="bg-slate-100 px-4 py-2 rounded-lg uppercase font-semibold shadow-md hover:text-white hover:bg-blue-500"
          onClick={isRunning ? handlePause : handleStart}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="bg-slate-100 px-4 py-2 rounded-lg uppercase font-semibold shadow-md hover:text-white hover:bg-blue-500"
          onClick={handleStop}
        >
          Stop
        </button>
      </div>
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
