"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const Home: React.FC = () => {
    /* this is a placeholder content for the index page
        modify during integration    
    */
    useEffect(() => {
        redirect("/login");
    });
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-24 py-10">
            <h1>Loading...</h1>
        </main>
    );
};

export default Home;
