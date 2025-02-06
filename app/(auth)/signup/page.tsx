import { AuthSignup } from "@/components/AuthSignup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Signup'
};

export default function Signup() {
    return(
        <div>
            <AuthSignup/>
        </div>
    )
}