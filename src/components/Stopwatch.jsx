import React, { useEffect, useRef, useState } from "react";
import { getTasks, saveTasks } from "../storage";

const Stopwatch = ({ task, tasksList, setTasksList }) => {
  const [elapsedTime, setElapsedTime] = useState(task.duration || 0);
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
    const updatedTask = tasksList.map((t) =>
      t.id === task.id ? { ...t, duration: elapsedTime } : t
    );
    setTasksList(updatedTask);
    saveTasks(updatedTask);
  }

  function handleReset() {
    setIsRunning(false);
    const updatedTask = tasksList.map((t) =>
      t.id === task.id ? { ...t, duration: 0 } : t
    );
    setTasksList(updatedTask);
    saveTasks(updatedTask);
    startTimerRef.current = 0;
    clearInterval(timerIdRef.current);
    setElapsedTime(0);
  }

  function handleTimer(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    let seconds = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
    let time = `${hours}:${minutes}:${seconds}`;
    console.log(time);
    return time;
  }

  return (
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
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;
