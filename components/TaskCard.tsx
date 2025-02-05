import { FiCheckCircle, FiClock } from "react-icons/fi";
import {format} from "date-fns";

export interface TaskProps {
    title: string;
    description: string;
    dueDate: Date;
    completed: Boolean;
    createdAt: Date;
}


export const TaskCard = ({ title, description, dueDate, completed, createdAt }: TaskProps) => {
    const formattedCreatedAt = format(new Date(createdAt), "dd MMM, yyyy");
    const formattedDueDate = format(new Date(dueDate), "dd MMM, yyyy");


    return (
        <div className="w-auto bg-white shadow-lg rounded-lg p-6 m-4 h-auto max-w-xs hover:shadow-2xl transition-all duration-300">
            <div className="text-2xl font-semibold text-center text-gray-800 mb-2">{title}</div>
            <div className="text-gray-600 text-sm text-center mb-4">{description}</div>
            <div className="flex justify-between items-center text-gray-500 text-xs">
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
                    <FiCheckCircle className="mr-2 text-green-500" />
                ) : (
                    <FiClock className="mr-2 text-red-500" />
                )}
                <span>{completed ? "Completed" : "Pending..."}</span>
            </div>
        </div>
    );
};