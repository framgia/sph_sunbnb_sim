"use client";
import React from "react";
import LoginForm from "./(auth)/login/LoginForm";

const Home: React.FC = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-24 py-10">
            <LoginForm />
        </main>
    );
};

export default Home;
