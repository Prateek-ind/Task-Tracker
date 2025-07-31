import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import { getTasks } from "./storage";
export default function App() {
  const [tasksList, setTasksList] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setTasksList(getTasks());
  }, []);

  useEffect(() => {
    if (!isInitialLoad) saveTasks(tasksList);
  }, [tasksList]);

  return (
    <>
      <h1 className="text 2xl font-bold py-4 pl-6">The Task Tracker</h1>
      <p className="text-xl pl-6">Hi there</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click</p>
        <AddTask tasksList={tasksList} setTasksList={setTasksList} />
        <p className="text-xl ">to add new task</p>
      </div>
      <div>
        <p className="bg-slate-200 px-2 w-1/3 ml-4 rounded mt-4 leading-8">
          To Do:
        </p>
        {tasksList
          .slice(0)
          .reverse()
          .map((task, i) => (
            <ToDo
              key={task.id}
              task={task}
              id={task.id}
              index={i}
              tasksList={tasksList}
              setTasksList={setTasksList}
            />
          ))}
      </div>
    </>
  );
}
