import { useState } from "react";

const AddTask = ({ tasksList, setTasksList }) => {
  const [addModal, setAddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") {
      setProjectName(value);
      setErrorMessage("");
    }

    if (name === "taskDescription") {
      setTaskDescription(value);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!projectName) {
      setErrorMessage("Enter a valid Project Name to continue");
    } else {
      setTasksList([
        ...tasksList,
        { id: Date.now(), projectName, taskDescription },
      ]);
      setAddModal(false);
      setProjectName("");
      setTaskDescription("");
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white 
      uppercase font-semibold text-sm 
      py-1 mx-1.5 pr-2.5 rounded 
      hover:opacity-70 cursor-pointer"
        onClick={() => setAddModal(true)}
      >
        + New
      </button>
      {addModal ? (
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
                <h3 className="text-3xl font-semibold">Add new task</h3>

                <button
                  className="px-1 text-gray-400 float-right
            text-3xl leading-none font-semibold block"
                  onClick={() => {
                    setAddModal(false);
                    setErrorMessage("");
                  }}
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
                leading-tight focus:outline-gray-200 focus:bg-white"
                    required
                  />
                  {errorMessage && (
                    <p className="text-red-500 text-center text-sm">
                      {errorMessage}
                    </p>
                  )}
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
                leading-tight focus:outline-gray-200 focus:bg-white"
                    required
                  />
                </div>
              </form>
              <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                <button
                  className="bg-blue-500 text-white uppercase 
                rounded px-6 py-3 hover:opacity-70"
                  onClick={handleAdd}
                >
                  Add task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddTask;
