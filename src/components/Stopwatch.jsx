import React, { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
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
  );
};

export default Stopwatch;
