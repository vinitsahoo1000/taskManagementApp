import { useEffect, useState } from "react"
import { TaskCard, TaskProps } from "./TaskCard"
import { getUserTask } from "@/app/actions/task";
import { CreateTask } from "./CreateTask";


export const TaskGrid = () =>{
    const [tasks,setTasks] = useState<TaskProps[]|null>(null);
    const [isCreateTaskOpen, setCreateTaskOpen] = useState(false);

    const toggleCreateTaskDialog = () => {
        setCreateTaskOpen(!isCreateTaskOpen);
    };

    useEffect(() =>{
        const fetchTask = async () =>{
            const token = localStorage.getItem("token");
            if (!token) return;

            const { tasks, error } = await getUserTask(token);

        if (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        } else {
            setTasks(tasks || []);
        }
        }
        fetchTask();
    },[])

    const addTask = (newTask: TaskProps) => {
        setTasks((prevTasks) => [newTask, ...(prevTasks || [])]);
    };

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {tasks?.length === 0 ? (
        <div className="text-center text-gray-500">No tasks available. Please add some tasks.</div>
        ) : tasks === null ? (
            <div className="text-center text-blue-500">loading.....</div>
        ) : (
            tasks.map((task: any) => (
                <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    dueDate={task.dueDate}
                    completed={task.completed}
                    createdAt={task.createdAt}
                />
            ))
        )}
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
                {isCreateTaskOpen && <CreateTask addTask={addTask} closeWindow={toggleCreateTaskDialog}/>}
        </div>
    )
}