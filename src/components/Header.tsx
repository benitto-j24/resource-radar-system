
import React from 'react';
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Resource Radar AI
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <SunIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
