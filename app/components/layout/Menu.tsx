"use client";

import React from "react";

const Menu = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 h-screen p-4">
      <ul className="space-y-4">
        <li>
          <a href="/dashboard" className="hover:text-blue-300">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/dashboard/user-types" className="hover:text-blue-300">
            User Types
          </a>
        </li>
        <li>
          <a href="/settings" className="hover:text-blue-300">
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;