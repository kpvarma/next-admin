"use client";

import React, { useState } from "react";

// UI Imports
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Page Component Imports
import RandomImageWithQuote from "@/components/general/random-quotes";

// Utils Import
import { saveToIndexedDB } from "@/utils/indexdb";
import { validateAPIUrl, validateAPIKey } from "@/utils/apis/api_key";

export default function AddServer({ onComplete }: { onComplete: () => void }) {
  const [apiName, setApiName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [errors, setErrors] = useState<{ apiName?: string; apiUrl?: string; apiKey?: string }>({});

  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [step3Complete, setStep3Complete] = useState(false);

  const [activeAccordion, setActiveAccordion] = useState("step1");

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: { apiName?: string; apiUrl?: string } = {};
    if (!apiName) validationErrors.apiName = "API Name is required.";
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStep1Complete(false);
      setActiveAccordion("step1");
    } else {
      setErrors({});
      setStep1Complete(true);
      setActiveAccordion("step2");
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, error } = await validateAPIUrl(apiUrl);
  
    if (!valid) {
      setErrors({ apiUrl: error });
      setStep2Complete(false);
      setActiveAccordion("step2");
    } else {
      setErrors((prev) => ({ ...prev, apiUrl: undefined }));
      setStep2Complete(true);
      setActiveAccordion("step3");
    }
  };
  
  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, error } = await validateAPIKey(apiUrl, apiKey);
  
    if (!valid) {
      setErrors({ apiKey: error });
      setStep3Complete(false);
      setActiveAccordion("step3");
    } else {
      await saveToIndexedDB({ apiName, apiUrl, apiKey, user_types: [] });
      setErrors((prev) => ({ ...prev, apiKey: undefined }));
      setStep3Complete(true);
      setActiveAccordion(null);
      onComplete();
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-background">
      {/* Form Section */}
      <div className="flex flex-col justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Configure Server</h1>
        <Accordion type="single" collapsible  value={activeAccordion} onValueChange={setActiveAccordion}>
          {/* Step 1 */}
          <AccordionItem value="step1">
            <AccordionTrigger
              className={`flex items-center text-lg justify-start ${
                step1Complete ? "text-green-500" : errors.apiName ? "text-red-500" : "text-gray-500"
              }`}
            >
              <div className="mr-2 flex items-center justify-center w-4 h-4">
                {step1Complete ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 15.586l8.293-8.293a1 1 0 011.414 1.414l-9 9A1 1 0 0110 18z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div className={`w-4 h-4 rounded-full ${errors.apiName ? "bg-red-500" : "bg-gray-400"}`} />
                )}
              </div>
              Step 1: Put a name to the Server
            </AccordionTrigger>
            <AccordionContent>
              <form className="flex flex-col gap-4 mt-4" onSubmit={handleStep1Submit}>
                <div>
                  {/* <Label htmlFor="api-name">Name</Label> */}
                  <Input
                    id="api-name"
                    type="text"
                    placeholder="Name (e.g., My API Server)"
                    value={apiName}
                    onChange={(e) => setApiName(e.target.value)}
                    required
                  />
                  {errors.apiName && <p className="text-red-500 text-sm">{errors.apiName}</p>}
                </div>
                <Button type="submit" className="mt-4 w-full">
                  Continue
                </Button>
              </form>
            </AccordionContent>
          </AccordionItem>

          {/* Step 2 */}
          <AccordionItem value="step2" disabled={!step1Complete}>
            <AccordionTrigger
              className={`flex items-center text-lg justify-start ${
                (step1Complete && step2Complete) ? "text-green-500" : errors.apiUrl ? "text-red-500" : "text-gray-500"
              }`}
            >
              <div className="mr-2 flex items-center justify-center w-4 h-4">
                {(step1Complete && step2Complete) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 15.586l8.293-8.293a1 1 0 011.414 1.414l-9 9A1 1 0 0110 18z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div className={`w-4 h-4 rounded-full ${errors.apiUrl ? "bg-red-500" : "bg-gray-400"}`} />
                )}
              </div>
              Step 1: Add API URL
            </AccordionTrigger>
            <AccordionContent>
              <form className="flex flex-col gap-4 mt-4" onSubmit={handleStep2Submit}>
                <div>
                  <Input
                    id="api-url"
                    type="url"
                    placeholder="API URL (e.g., https://api.example.com)"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    required
                  />
                  {errors.apiUrl && <p className="text-red-500 text-sm">{errors.apiUrl}</p>}
                </div>
                <Button type="submit" className="mt-4 w-full">
                  Continue
                </Button>
              </form>
            </AccordionContent>
          </AccordionItem>

          {/* Step 3 */}
          <AccordionItem value="step3" disabled={!(step1Complete && step2Complete)}>
            <AccordionTrigger
              className={`flex items-center text-lg justify-start ${
                (step1Complete && step2Complete && step3Complete && !errors.apiKey) ? "text-green-500" : errors.apiKey ? "text-red-500" : "text-gray-500"
              }`}
            >
              <div className="mr-2 flex items-center justify-center w-4 h-4">
                {(step1Complete && step2Complete && step3Complete) && !errors.apiKey ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 15.586l8.293-8.293a1 1 0 011.414 1.414l-9 9A1 1 0 0110 18z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full ${
                      (step1Complete && step2Complete)
                        ? errors.apiKey
                          ? "bg-red-500"
                          : "bg-gray-400"
                        : "bg-gray-400"
                    }`}
                  />
                )}
              </div>
              Step 2: Enter API KEY
            </AccordionTrigger>
            <AccordionContent>
              <form className="flex flex-col gap-4 mt-4" onSubmit={handleStep3Submit}>
                <div>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    required
                  />
                  {errors.apiKey && <p className="text-red-500 text-sm">{errors.apiKey}</p>}
                </div>
                <Button type="submit" className="mt-4 w-full">
                  Verify
                </Button>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Image Section */}
      <div className="hidden lg:flex items-center justify-center bg-muted relative">
        <RandomImageWithQuote />
      </div>

    </div>
  );
}