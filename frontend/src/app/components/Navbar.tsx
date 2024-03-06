import React from 'react';

const NavigationItem = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
  <div
    className="cursor-pointer hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(event) => {if (event.key === 'Enter') onClick();}}
    role="button"
  >
    {children}
  </div>
);

const Navbar = () => (
  <header className="flex justify-between items-center px-16 py-3 w-full bg-white sm:flex-wrap sm:px-5">
    <img
      loading="lazy"
      src="/images/sunbnblogo.svg"
      alt="Logo"
      className="h-16"
    />
    <nav className="flex flex-col gap-5">
      <NavigationItem onClick={() => console.log('Navigating to Home')}>Home</NavigationItem>
      <NavigationItem onClick={() => console.log('Navigating to Calendar')}>Calendar</NavigationItem>
      <NavigationItem onClick={() => console.log('Navigating to Listings')}>Listings</NavigationItem>
    </nav>
    
  </header>
);



export default Navbar;