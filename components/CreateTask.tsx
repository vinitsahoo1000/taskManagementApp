"use client"
import { createTask } from "@/app/actions/task";
import { DescriptionBox } from "./common/DescriptionBox";
import { InputBox } from "./common/InputBox";
import { useState } from "react";
import { TaskProps } from "./TaskCard";

interface CreateTaskProps{
    closeWindow : ()=> void;
    addTask: (newTask: TaskProps) => void;
}


export const CreateTask = ({closeWindow,addTask}:CreateTaskProps) => {
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [formData, setFormData] = useState({ title: "", description: ""});

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(new Date(e.target.value));
    };

    const handleAddTask = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            alert("No token found. Please log in.");
            return;
        }
    
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
    
        try {
            const response = await createTask(data, token,dueDate!);
    
            if (response.error) {
                alert(response.error);
            } else {
                alert(response.message);
                if (response.task) {
                    addTask(response.task);
                } else {
                    alert("Task creation failed.");
                }
                closeWindow(); 
            }
        } catch (error) {
            console.error("Error creating task:", error);
            alert("An error occurred while adding the task.");
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
                        className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    );
};
