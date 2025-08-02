export const getTasks = () =>
  JSON.parse(localStorage.getItem("tasksList")) || [];

export const saveTasks = (tasks) =>
  localStorage.setItem("tasksList", JSON.stringify(tasks));

export function saveCompletedTasks(completed) {
  localStorage.setItem("completed", JSON.stringify(completed));
}

export function getCompletedTasks() {
  const completed = localStorage.getItem("completed");
  return completed ? JSON.parse(completed) : [];
}
