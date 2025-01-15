"use client";

import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-primary text-primary-foreground px-4 py-2 shadow-md">
      <div className="flex items-center gap-2">
        <Menu className="w-6 h-6 cursor-pointer lg:hidden" />
        <h1 className="text-xl font-semibold">My App</h1>
      </div>
      <nav className="hidden lg:flex gap-4">
        <a href="/dashboard" className="hover:underline">
          Dashboard
        </a>
        <a href="/profile" className="hover:underline">
          Profile
        </a>
        <a href="/settings" className="hover:underline">
          Settings
        </a>
      </nav>
    </header>
  );
}