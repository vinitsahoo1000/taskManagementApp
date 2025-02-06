import { AuthLogin } from "@/components/AuthLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login'
};

export default function Login(){
    return(
        <div>
            <AuthLogin/>
        </div>
    )
}