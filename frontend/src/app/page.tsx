"use client";
import Image from "next/image";
import React from "react";
import Title from "./components/Title";
import Button from "./components/Button";
import HiComponent from "./components/HiComponent";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import NewListingForm from "./components/NewListingForm";
import ApprovalModal from "./components/ApprovalModal";
import EditWarningModal from "./components/EditWarningModal";
import NavBar from "./components/Navbar";

const Home: React.FC = () => {
    const handleClick = (): void => {
        alert("Welcome!");
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            
            <NewListingForm></NewListingForm>
            
        </main>
    );
};

export default Home;
