"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import prisma from "@/db"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables!");
}

export async function signup(formData: FormData) {
    try{
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!name || !email || !password) {
            return { error: "Name, email, and password are required!", status: 400 };
        }

        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            return { error: "Email already exists!", status: 409 };
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        })
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });
        
        return ({message: "User signup succesful",token})
    }catch(error:any){
        return { error: `Error: ${error.message}`, status: 500 };
    }
}


export async function login(formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { error: "Email and password are required!", status: 400 };
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return { error: "User not found!", status: 404 };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: "Invalid credentials!", status: 401 };
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        
        return ({message: "User login succesful",token})
    } catch (error: any) {
        return { error: `Error: ${error.message}`, status: 500 };
    }
}

