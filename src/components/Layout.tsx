
import React from 'react';
import { Search } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface TaskItem {
  title: string;
  isActive?: boolean;
}

const TaskList = ({ title, tasks }: { title: string; tasks: TaskItem[] }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold">{title}</h2>
      <span className="text-xs text-muted-foreground">{tasks.length} Total</span>
    </div>
    {tasks.map((task, index) => (
      <button
        key={index}
        className={cn(
          "w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-muted",
          task.isActive && "bg-muted"
        )}
      >
        {task.title}
      </button>
    ))}
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const todayTasks = [
    {
      title: "Retrieve the latest employee engagement metrics",
      isActive: true
    },
    {
      title: "List employees participating in cross-functional projects"
    },
    {
      title: "Analyze performance review trends for Q1"
    },
    {
      title: "Evaluate the efficiency of resource allocation"
    },
    {
      title: "Identify employees whose skills are underutilized"
    }
  ];

  const previousTasks = [
    { title: "Mobile app prototypes library" },
    { title: "ROM Types and uses" },
    { title: "Fix SSL/TLS Error" },
    { title: "Platform template for developers" },
    { title: "Mobile development with golang" }
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-72 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-xl">NEXTGEN BOT</h1>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center h-9 px-4 border rounded-md bg-background text-muted-foreground">
            <Search className="h-4 w-4 mr-2" />
            <input 
              type="text" 
              placeholder="Search" 
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto px-4 space-y-6">
          <TaskList title="Today" tasks={todayTasks} />
          <Separator />
          <TaskList title="Previous 7 Days" tasks={previousTasks} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b flex items-center justify-between px-4">
          <h2 className="font-semibold">nextgenBOT</h2>
          <div className="flex items-center space-x-2">
            {/* Theme toggle and other controls would go here */}
          </div>
        </div>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
