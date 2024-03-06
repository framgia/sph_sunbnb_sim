import React from "react";
import NavigationItem from "./NavigationItem";

const Navbar: React.FC = () => {
    return (
        <header className="flex w-full items-center justify-between bg-white px-16 py-3 sm:flex-wrap sm:px-5">
            {/* convert to svg
    <img
      loading="lazy"
      src="/images/sunbnblogo.svg"
      alt="Logo"
      className="h-16"
    /> */}
            <nav className="flex flex-col gap-5">
                <NavigationItem
                    onClick={() => {
                        console.log("Navigating to Home");
                    }}
                >
                    Home
                </NavigationItem>
                <NavigationItem
                    onClick={() => {
                        console.log("Navigating to Calendar");
                    }}
                >
                    Calendar
                </NavigationItem>
                <NavigationItem
                    onClick={() => {
                        console.log("Navigating to Listings");
                    }}
                >
                    Listings
                </NavigationItem>
            </nav>
        </header>
    );
};

export default Navbar;
