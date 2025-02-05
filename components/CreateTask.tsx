"use client"
import { DescriptionBox } from "./common/DescriptionBox";
import { InputBox } from "./common/InputBox";
import { useState } from "react";

interface CreateTaskProps{
    closeWindow : ()=> void;
    createTask: ()=> void;
}


export const CreateTask = ({closeWindow,createTask}:CreateTaskProps) => {
    const [dueDate, setDueDate] = useState<string>("");

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
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
                <InputBox label="Title" placeholder="Task title..." />
                <DescriptionBox />
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900">
                        Select Due Date
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={handleDateChange}
                        className="block w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => createTask}
                        className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    );
};
