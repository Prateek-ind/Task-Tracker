import React from "react";
import AddTask from "./components/AddTask";

export default function App() {
  return (
    <>
      <h1 className="text 2xl font-bold py-4 pl-6">The Task Tracker</h1>
      <p className="text-xl pl-6">Hi there</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click</p>
        <AddTask />
        <p className="text-xl ">to add new task</p>
      </div>
    </>
  );
}
