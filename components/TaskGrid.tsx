import { useEffect, useState, useCallback } from "react"
import { TaskCard } from "./TaskCard"
import { getUserTask, Task } from "@/app/actions/task"
import { CreateTask } from "./CreateTask"
import { TaskEditor } from "./TaskEditor"

export const TaskGrid = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateTaskOpen, setCreateTaskOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const fetchTasks = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsLoading(false);
                return;
            }

            const { tasks: fetchedTasks, error } = await getUserTask(token);

            if (error) {
                console.error("Error fetching tasks:", error);
                setTasks([]);
            } else if (fetchedTasks) {
                const formattedTasks = fetchedTasks.map(task => ({
                    ...task,
                    createdAt: new Date(task.createdAt),
                }));
                setTasks(formattedTasks);
            }
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            setTasks([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const toggleCreateTaskDialog = () => {
        setCreateTaskOpen(prev => !prev);
    };

    const addTask = (newTask: Task) => {
        setTasks(prevTasks => [newTask, ...prevTasks]);
    };

    const removeTask = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const markTaskCompleted = (taskId: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: true } : task
            )
        );
    };

    const updateTaskInUI = (updatedTask: Task) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    return (
        <div className="relative min-h-screen p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-blue-500">
                        Loading tasks...
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">
                        No tasks available. Please add some tasks.
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            {...task}
                            onDeleteSuccess={removeTask}
                            onCompleteSuccess={markTaskCompleted}
                            onClick={() => setSelectedTask(task)}
                        />
                    ))
                )}
            </div>

            {selectedTask && (
                <TaskEditor
                    task={selectedTask}
                    closeWindow={() => setSelectedTask(null)}
                    updateTaskInUI={updateTaskInUI}
                />
            )}

            <button
                onClick={toggleCreateTaskDialog}
                className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

            {isCreateTaskOpen && (
                <CreateTask
                    addTask={addTask}
                    closeWindow={toggleCreateTaskDialog}
                />
            )}
        </div>
    )
}