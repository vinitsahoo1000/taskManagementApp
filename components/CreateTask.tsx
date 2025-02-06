"use client"
import { createTask, Task } from "@/app/actions/task";
import { DescriptionBox } from "./common/DescriptionBox";
import { InputBox } from "./common/InputBox";
import { useState } from "react";
import { toast } from "react-toastify";

interface CreateTaskProps{
    closeWindow : ()=> void;
    addTask: (newTask: Task) => void;
}


export const CreateTask = ({closeWindow,addTask}:CreateTaskProps) => {
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [formData, setFormData] = useState({ title: "", description: ""});
    const [loading,setLoading] = useState(false);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(new Date(e.target.value));
    };

    const handleAddTask = async () => {
        if (!formData.title || !formData.description || !dueDate) {
            toast.error("Please fill in all required fields");
            return;
        }
    
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
            toast.error("No token found. Please log in.");
            setLoading(false);
            return;
        }
    
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
    
        try {
            const response = await createTask(data, token, dueDate);
    
            if (response.error) {
                toast.error(response.error);
                return;
            }
    
            if (response.task) {
                toast.success(response.message);
                addTask({ ...response.task });
                closeWindow();
            } else {
                toast.info("Task creation failed.");
            }
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error("An error occurred while adding the task.");
        } finally {
            setLoading(false);
        }
    };
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <InputBox name="title" label="Title" placeholder="Task title..." onChange={handleChange} />
                <DescriptionBox onChange={handleChange} />
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900">
                        Select Due Date
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        onChange={handleDateChange}
                        className="block w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleAddTask}
                        className={`w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 ${loading 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Creating...' : 'Create Task'}
                    </button>
                </div>
            </div>
        </div>
    );
};
