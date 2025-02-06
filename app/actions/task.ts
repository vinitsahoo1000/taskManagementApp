"use server"
export const runtime = "nodejs";
import prisma from "@/db"
import jwt from "jsonwebtoken";
import { ActionResponse } from "./user";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables!");
}

interface DecodedToken {
    userId?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    userId: string;
    createdAt: Date;
    dueDate: Date;
    completed: boolean;
}

interface TaskResponse extends ActionResponse {
    task?: Task; // Use your Task model type here
    tasks?: Task[]; // Use your Task array model type here
}

export async function createTask(formData:FormData,token:string,dueDate:Date):Promise<TaskResponse>{
    try{
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        
        if (!decoded?.userId) {
            throw new Error("Invalid token");
        }

        if(!title || !description || !dueDate){
            return { error: "title, description and dueDate required!"};
        }

        const newTask = await prisma.task.create({
            data:{
                title,
                description,
                userId: decoded.userId,
                dueDate
            }
        })
        if(!newTask){
            return ({message: "Error creating new task"})
        }

        return ({message: "Task created successfully!!!",task: newTask})
    }catch(error: unknown){
        if (error instanceof Error) {
            return { error: `Error: ${error.message}` };
        }
        return { error: 'An unknown error occurred' };
    }
} 


export async function getUserTask(token:string):Promise<TaskResponse>{
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        
        if (!decoded?.userId) {
            throw new Error("Invalid token");
        }

        const userTasks = await prisma.user.findUnique({
            where:{
                id: decoded.userId
            },
            select:{
                tasks: true
            }
        })

        if (userTasks === null) {
            throw new Error("User tasks not found");
        }

        return { tasks: userTasks.tasks };
    }catch(error:unknown){
        if (error instanceof Error) {
            return { error: error.message || 'Error: Error fetching user tasks' };
        }
        return { error: 'An unknown error occurred' };
    }
}


export async function deleteTask(taskId:string,token:string):Promise<TaskResponse>{
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        
        if (!decoded?.userId) {
            throw new Error("Invalid token");
        }

        const deleteTask = await prisma.task.delete({
            where:{
                id: taskId,
                userId: decoded.userId
            }
        })

        if(!deleteTask){
            return ({message: "Task delete failed!!!"})
        }
        return { task: deleteTask };
    }catch(error:unknown){
        if (error instanceof Error) {
            return { error: error.message || 'Error: Error deleting user tasks' };
        }
        return { error: 'An unknown error occurred' };
    }
}


export async function completeTask(taskId:string,token:string):Promise<TaskResponse>{
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        
        if (!decoded?.userId) {
            throw new Error("Invalid token");
        }

        const taskComplete = await prisma.task.update({
            where: {
                id: taskId,
                userId: decoded.userId
            },
            data:{
                completed: true
            }
        })

        if(!taskComplete){
            return ({message: "Task completed failed!!!"})
        }

        return { message: "Task completed" };
    }catch(error:unknown){
        if (error instanceof Error) {
            return { error: error.message || 'Error: Error completing task' };
        }
        return { error: 'An unknown error occurred' };
    }
}


export async function getTask(taskId:string,token:string):Promise<TaskResponse>{
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        
        if (!decoded?.userId) {
            throw new Error("Invalid token");
        }

        const singleTask = await prisma.task.findUnique({
            where:{
                userId: decoded.userId,
                id: taskId
            }
        })
        
        if(!singleTask){
            return ({message: "Task not found!!!"})
        }
        return({task: singleTask});
    }catch(error:unknown){
        if (error instanceof Error) {
            return { error: error.message || 'Error: Error finding task' };
        }
        return { error: 'An unknown error occurred' };
    }
}


export async function editTask(taskId:string,token:string,formData:FormData,dueDate:Date):Promise<TaskResponse> {
    try{
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        
        if (!decoded?.userId) {
            throw new Error("Invalid token");
        }

        const updateTask = await prisma.task.update({
            where:{
                userId:decoded.userId,
                id: taskId
            },
            data:{
                title,
                description,
                dueDate
            }
        })
        
        if(!updateTask){
            return({message: "Fail to update task!!"})
        }
        return({task:updateTask})
    }catch(error:unknown){
        if (error instanceof Error) {
            return { error: error.message || 'Error: Error updating task' };
        }
        return { error: 'Error: Error updating task' };
    }
}