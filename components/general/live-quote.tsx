"use client";

import React, { useEffect, useState } from "react";
import quotes from "@/utils/quotes.json"; // Adjust the path as needed

interface Quote {
  content: string;
  author: string;
}

export default function LiveQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    // Pick a random quote from the imported JSON
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="text-left p-4 bg-black bg-opacity-60 text-white rounded-md">
      <p className="italic text-sm">{quote && `"${quote.content}"`}</p>
      <p className="text-xs text-right mt-1">— {quote?.author || "Unknown"}</p>
    </div>
  );
}