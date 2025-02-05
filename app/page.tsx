"use client"
import { CreateTask } from "@/components/CreateTask";
import { SideMenu } from "@/components/SideMenu";
import { TaskGrid } from "@/components/TaskGrid";
import { useState } from "react";

export default function Home() {
  const [isCreateTaskOpen, setCreateTaskOpen] = useState(false);

  const toggleCreateTaskDialog = () => {
    setCreateTaskOpen(!isCreateTaskOpen);
  };

  return (
    <div>
        <div className="grid grid-cols-5">
                <div className="col-span-1 p-4">
                    <SideMenu/>
                </div>
                <div className="col-span-4 p-4 pt-0">
                    <TaskGrid/>
                </div>
        </div>
        <button
        onClick={toggleCreateTaskDialog}
        className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Create Task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      {isCreateTaskOpen && <CreateTask closeWindow={toggleCreateTaskDialog} createTask={() =>{}}/>}
    </div>
  );
}
