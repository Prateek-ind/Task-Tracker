export const getTasks = () =>
  JSON.parse(localStorage.getItem("tasksList")) || [];

export const saveTasks = (tasks) =>
  localStorage.setItem("tasksList", JSON.stringify(tasks));
