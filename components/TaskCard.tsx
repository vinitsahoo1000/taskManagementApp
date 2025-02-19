import { FiCheckCircle, FiClock,FiTrash, FiCheck, FiEdit } from "react-icons/fi";
import {format} from "date-fns";
import { completeTask, deleteTask } from "@/app/actions/task";
import { toast } from "react-toastify";
import { useState } from "react";

interface TaskCardProps {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    createdAt: Date;
    onDeleteSuccess?: (taskId: string) => void;
    onCompleteSuccess?: (taskId: string) => void;
    onClick?: () => void;
}


export const TaskCard = ({ id, title, description, dueDate, completed, createdAt, onDeleteSuccess,onCompleteSuccess,onClick}: TaskCardProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const formattedCreatedAt = format(new Date(createdAt), "dd MMM, yyyy");
    const formattedDueDate = format(new Date(dueDate), "dd MMM, yyyy");

    const onDelete = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            const response = await deleteTask(id);
            if (response) {
                toast.info("Task deleted");
                if (onDeleteSuccess) {
                    onDeleteSuccess(id);
                }
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("An error occurred while deleting the task.");
        } finally {
            setIsDeleting(false);
        }
    }

    const onComplete = async () => {
        if (isCompleting) return;

        setIsCompleting(true);
        try {
            const response = await completeTask(id);
            if (response) {
                toast.success("Task completed");
                if (onCompleteSuccess) {
                    onCompleteSuccess(id);
                }
            }
        } catch (error) {
            console.error("Error completing task:", error);
            toast.error("An error occurred while completing the task.");
        } finally {
            setIsCompleting(false);
        }
    }

    return (
        <div className="relative bg-white shadow-lg rounded-xl p-6 w-full max-w-xs hover:shadow-2xl transition-all duration-300">
            <div className="text-lg font-semibold text-gray-800 text-center mb-2">
                {title}
            </div>
            <div className="text-gray-600 text-sm text-center mb-4">
                {description}
            </div>
            <div className="flex justify-between items-center text-gray-500 text-xs border-t border-gray-200 pt-2">
                <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>Created: {formattedCreatedAt}</span>
                </div>
                <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>Due: {formattedDueDate}</span>
                </div>
            </div>
            <div className={`mt-4 flex justify-center items-center text-sm ${completed ? 'text-green-500' : 'text-red-500'}`}>
                {completed ? (
                    <>
                        <FiCheckCircle className="mr-2 text-green-500" />
                        <span>Completed</span>
                    </>
                ) : (
                    <>
                        <FiClock className="mr-2 text-red-500" />
                        <span>Pending...</span>
                    </>
                )}
            </div>
            <div className="mt-6 flex justify-between">
            <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-md shadow transition-all duration-300 ${
                        isDeleting 
                            ? 'bg-red-400 cursor-not-allowed' 
                            : 'bg-red-500 hover:bg-red-600'
                    } text-white`}
                >
                    <FiTrash className="w-4 h-4" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>

                {!completed && (
                    <button
                        onClick={onComplete}
                        disabled={isCompleting}
                        className={`flex items-center gap-1 text-xs px-3 py-1 rounded-md shadow transition-all duration-300 ${
                            isCompleting 
                                ? 'bg-green-400 cursor-not-allowed' 
                                : 'bg-green-500 hover:bg-green-600'
                        } text-white`}
                    >
                        <FiCheck className="w-4 h-4" />
                        {isCompleting ? 'Completing...' : 'Complete'}
                    </button>
                )}
            <button
                onClick={onClick}
                className="flex items-center gap-1 text-xs bg-slate-500 text-white px-3 py-1 rounded-md shadow hover:bg-slate-600 transition-all duration-300"
            >
                <FiEdit className="w-4 h-4" /> Edit
            </button>
            </div>
        </div>
    );
};