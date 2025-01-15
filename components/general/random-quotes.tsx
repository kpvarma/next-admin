"use client";

import React, { useState, useEffect } from "react";
import LiveQuote from "@/components/general/live-quote";

export default function RandomImageWithQuote() {
  const [randomImageId, setRandomImageId] = useState<number | null>(null);

  useEffect(() => {
    // Generate the random number after the component mounts
    setRandomImageId(Math.floor(Math.random() * 10000));
  }, []);

  return (
    <div>
      {/* Background Image */}
      {randomImageId && (
        <img
          src={`https://picsum.photos/800/450?random=${randomImageId}`}
          alt="Placeholder"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-50 text-white">
        {/* Left Section - Live Quote */}
        <div className="text-left">
          <LiveQuote />
        </div>

        {/* Logo Section */}
        <div className="text-right">
          <h1 className="text-2xl font-bold">Devise CRUD</h1>
          <p className="text-sm italic">Seamless UI for Rails Devise</p>
          <a
            href="https://github.com/kpvarma/devise_crud/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-500 mt-2 inline-block"
          >
            Homepage
          </a>
        </div>
      </div>
    </div>
  );
}