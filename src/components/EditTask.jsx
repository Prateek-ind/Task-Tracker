import { useEffect, useState } from "react";
import { saveTasks } from "../storage.js";

const EditTask = ({ task, tasksList, index, setTasksList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") setProjectName(value);
    if (name === "taskDescription") setTaskDescription(value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let updatedTask = tasksList.map((t) => {
      return t.id === task.id
        ? { ...t, projectName, taskDescription, duration: t.duration }
        : t;
    });
    setTasksList(updatedTask);
    saveTasks(updatedTask);
    setEditModal(false);
  };

  return (
    <>
      <button
        className="bg-slate-400 text-white text-sm uppercase px-3
       py-1.5 font-semibold rounded-lg hover:bg-slate-600"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>
      {editModal ? (
        <>
          <div
            className=" flex items-center justify-center
          overflow-x-hidden overflow-y-auto fixed inset-0 z-100"
          >
            <div className="w-9/12 max-w-lg bg-white border rounded-lg shadow-md relative flex flex-col">
              <div
                className=" flex flex-row justify-between
             p-5 bg-white border-b border-slate-200 rounded-t"
              >
                <h3 className="text-3xl font-semibold">Edit task</h3>

                <button
                  className="px-1 text-gray-400 float-right
            text-3xl leading-none font-semibold block"
                  onClick={() => setEditModal(false)}
                >
                  X
                </button>
              </div>
              <form className="px-6 pb-4 pt-6">
                <div>
                  <label
                    htmlFor="project-name"
                    className="tracking-wide uppercase text-gray-700
                     text-xs font-semibold mb-2 block"
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="project-name"
                    placeholder="Project"
                    name="projectName"
                    value={projectName}
                    onChange={handleInput}
                    className="w-full bg-gray-200 text-gray-700 
                border-gray-200 rounded py-4 px-4 mb-5 
                leading-tight focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="project-name"
                    className="tracking-wide 
                    uppercase text-gray-700 text-xs 
                    font-semibold mb-2 block"
                  >
                    Task Description
                  </label>
                  <textarea
                    type="text"
                    rows={4}
                    id="project-name"
                    placeholder="Description"
                    name="taskDescription"
                    value={taskDescription}
                    onChange={handleInput}
                    className="w-full bg-gray-200 text-gray-700 
                border-gray-200 rounded py-4 px-4 mb-5 
                leading-tight focus:outline-none focus:bg-white"
                  />
                </div>
              </form>
              <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                <button
                  className="bg-blue-500 text-white uppercase 
                rounded px-6 py-3 hover:opacity-70"
                  onClick={handleUpdate}
                >
                  Update task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default EditTask;
