import { useEffect, useState, useCallback } from "react";
import { DescriptionBox } from "./common/DescriptionBox"
import { InputBox } from "./common/InputBox"
import { editTask, getTask, Task } from "@/app/actions/task";


interface TaskEditorProps {
    task: Task
    closeWindow: () => void;
    updateTaskInUI: (updatedTask: Task) => void;
}

export const TaskEditor = ({ task, closeWindow, updateTaskInUI }: TaskEditorProps) => {
    const [dueDate, setDueDate] = useState<Date | null>(task.dueDate);
    const [formData, setFormData] = useState({ title: task.title, description: task.description });

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(new Date(e.target.value));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getsingleTask = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            
            const response = await getTask(task.id, token);
            if (response.task) {
                setFormData({
                    title: response.task?.title,
                    description: response.task?.description
                });
            }
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    }, [task.id]); 

    useEffect(() => {
        getsingleTask();
    }, [getsingleTask]);

    const updateTask = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            
            if (!dueDate) {
                console.error("Due date is required");
                return;
            }

            const response = await editTask(task.id, token, formDataToSend, dueDate);

            if (response) {
                const updatedTask: Task = {
                    ...task,
                    title: formData.title,
                    description: formData.description,
                    dueDate: dueDate,
                };
                updateTaskInUI(updatedTask);
                closeWindow();
                return { message: "Task updated successfully!!!" };
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-xl space-y-6 relative">
                <button
                    onClick={closeWindow}
                    className="absolute top-4 right-4 text-xl font-semibold text-gray-600 hover:text-gray-900"
                >
                    &times;
                </button>
                <InputBox 
                    value={formData.title} 
                    name="title" 
                    label="Title" 
                    placeholder="Task title..." 
                    onChange={handleInputChange} 
                />
                <DescriptionBox value={formData.description} onChange={handleInputChange} />
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900">
                        Select Due Date
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        onChange={handleDateChange}
                        value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
                        className="block w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={updateTask}
                        className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
                    >
                        Edit Task
                    </button>
                </div>
            </div>
        </div>
    );
};