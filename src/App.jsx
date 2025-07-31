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
     <div className="flex flex-row">
       <div className="w-full">
        <h2 className="w-3/4 ml-6 max-w-lg bg-gray-200 px-4 py-2  rounded mt-4 leading-8">
          To Do:
        </h2>
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
      <div className="w-full">
        <h2 className="w-3/4 ml-6 max-w-lg bg-gray-200 px-4 py-2  rounded mt-4 leading-8">
          Completed Tasks
        </h2>
       
      </div>
     </div>
    </>
  );
}
