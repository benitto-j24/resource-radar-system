import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { employeesData } from "@/data/employees"; 
import { calculateUtilization } from "@/utils/utilizationUtils";

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
    {tasks.length > 0 ? (
      tasks.map((task, index) => (
        <button
          key={index}
          className={cn(
            "w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-muted",
            task.isActive && "bg-muted"
          )}
        >
          {task.title}
        </button>
      ))
    ) : (
      <p className="text-muted-foreground text-xs px-2">No matching tasks</p>
    )}
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const todayTasks: TaskItem[] = [
    { title: "Retrieve the latest employee engagement metrics", isActive: true },
    { title: "List employees participating in cross-functional projects" },
    { title: "Analyze performance review trends for Q1" },
    { title: "Evaluate the efficiency of resource allocation" },
    { title: "Identify employees whose skills are underutilized" }
  ];

  const previousTasks: TaskItem[] = [
    { title: "Mobile app prototypes library" },
    { title: "ROM Types and uses" },
    { title: "Fix SSL/TLS Error" },
    { title: "Platform template for developers" },
  ];

  // Calculate utilization
  const utilizationResults = employeesData.map(calculateUtilization);
  const overUtilized = utilizationResults.filter(emp => emp.status === 'Overutilized');
  const underUtilized = utilizationResults.filter(emp => emp.status === 'Underutilized');

  // Filtered tasks
  const filteredTodayTasks = todayTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPreviousTasks = previousTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-72 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-xl">NEXTGEN BOT</h1>
          </div>
        </div>
        {/* Search */}
        <div className="p-4">
          <div className="flex items-center h-9 px-4 border rounded-md bg-background text-muted-foreground">
            <Search className="h-4 w-4 mr-2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>
        {/* Task Lists */}
        <div className="flex-1 overflow-auto px-4 space-y-6">
          <TaskList title="Today" tasks={filteredTodayTasks} />
          <Separator />
          <TaskList title="Previous 7 Days" tasks={filteredPreviousTasks} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b flex items-center justify-between px-4 relative">
          <h2 className="font-semibold">nextgenBOT</h2>

          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setNotificationOpen(prev => !prev)}
                className="relative p-2 rounded-full hover:bg-muted focus:outline-none"
              >
                <Bell className="h-5 w-5" />
                {(overUtilized.length + underUtilized.length) > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50 p-4 space-y-3">
                  {/* Underutilized */}
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Underutilized Employees</h3>
                    {underUtilized.length > 0 ? (
                      underUtilized.map((data, idx) => (
                        <div key={idx} className="text-sm text-gray-700">
                          {data.employee.Name}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-gray-400">None</div>
                    )}
                  </div>

                  <Separator />

                  {/* Overutilized */}
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Overutilized Employees</h3>
                    {overUtilized.length > 0 ? (
                      overUtilized.map((data, idx) => (
                        <div key={idx} className="text-sm text-gray-700">
                          {data.employee.Name}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-gray-400">None</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Main */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
