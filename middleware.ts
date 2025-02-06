import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables!");
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;  
    
    if(!token){
      return NextResponse.redirect(new URL("/login", request.url));
    }

      try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.next(); 
      } catch (error) {
        console.error("JWT Verification Failed:", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
  matcher: ["/"], 
};
