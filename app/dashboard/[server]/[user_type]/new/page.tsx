"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function AddUserType() {
  const { server, user_type } = useParams();
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert(`Added ${user_type}: ${formData.name}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Add New {user_type} (Server: {server})
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter email"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add {user_type}
        </button>
      </form>
    </div>
  );
}