import React from "react";
import LoginForm from "@/app/(auth)/login/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <LoginForm />
        </main>
    );
};

export default LoginPage;
