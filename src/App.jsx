import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import { getTasks, saveTasks } from "./storage";
import { useDrop } from "react-dnd";

export default function App() {
  const [tasksList, setTasksList] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setTasksList(getTasks());
  }, []);

  useEffect(() => {
    if (!isInitialLoad) saveTasks(tasksList);
  }, [tasksList]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToComplete(
        item.id,
        item.projectName,
        item.taskDescription,
        item.duration
      ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function addToComplete(id, projectName, taskDescription, duration) {
    // ✅ Construct task object correctly (includes id)
    const completedTask = { id, projectName, taskDescription, duration };

    // ✅ Add to completed
    setCompleted((prev) => [...prev, completedTask]);

    // ✅ Remove from active tasks
    const updatedTasks = tasksList.filter((task) => task.id !== id);
    setTasksList(updatedTasks);
    saveTasks(updatedTasks);
  }

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
                isCompleted={false}
              />
            ))}
        </div>
        <div className="w-full" ref={drop}>
          <h2 className="w-3/4 ml-6 max-w-lg bg-gray-200 px-4 py-2  rounded mt-4 leading-8">
            Completed Tasks
          </h2>
          {completed
            .slice(0)
            .reverse()
            .map((task, i) => (
              <ToDo
                key={task.id}
                task={task}
                id={task.id}
                index={i}
                tasksList={[]}
                setTasksList={() => {}}
                isCompleted={true}
              />
            ))}
        </div>
      </div>
    </>
  );
}
