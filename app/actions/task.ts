"use server"
import prisma from "@/db"
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables!");
}

export async function createTask(formData:FormData,token:string,dueDate:Date){
    try{
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const decoded = jwt.verify(token, JWT_SECRET) as { userId?: string } | null;
        
        if (!decoded?.userId) {
            throw new Error("Invalid token");
        }

        if(!title || !description || dueDate){
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
    }catch(error: any){
        return { error: `Error: ${error.message}`};
    }
} 


export async function getUserTask(token:string){
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as { userId?: string } | null;
        
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
    }catch(error:any){
        return { error: error.message || 'Error: Error fetching user tasks' };
    }
}