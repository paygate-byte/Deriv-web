"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BaseLayout } from "~/app/_components/BaseLayout";

export default function UploadBotPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [botName, setBotName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a file to upload");
      setIsLoading(false);
      return;
    }

    try {
      // Create a FormData instance
      const formData = new FormData();
      formData.append("name", botName);
      formData.append("description", description);
      formData.append("file", file);

      // In a real application, you would upload this formData using a fetch request
      // For now, let's simulate a successful upload
      setTimeout(() => {
        setSuccess("Bot uploaded successfully!");
        setIsLoading(false);

        // Reset form
        setBotName("");
        setDescription("");
        setFile(null);

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/admin/bots");
        }, 2000);
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to upload bot. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/admin/bots"
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Bots
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full">
              Admin
            </span>
            <h1 className="text-3xl font-bold text-white">
              Upload New Bot
            </h1>
          </div>
          <p className="text-gray-300">
            Upload a new trading bot to make available to your users.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-[#151530] p-6 rounded-xl border border-white/10">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded text-green-500 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="botName" className="block text-white mb-2">
                  Bot Name
                </label>
                <input
                  id="botName"
                  type="text"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="w-full p-3 bg-[#1a1a40] border border-white/10 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter bot name"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-white mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-[#1a1a40] border border-white/10 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
                  placeholder="Enter a detailed description of the bot, its strategy, and usage instructions"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="file" className="block text-white mb-2">
                  Bot File
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-md p-6 text-center">
                  <input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".zip,.xml,.json,.js"
                    required
                  />
                  <label
                    htmlFor="file"
                    className="cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {file ? (
                      <span className="text-cyan-400">{file.name}</span>
                    ) : (
                      <>
                        <span className="text-white font-medium">Click to upload bot file</span>
                        <span className="text-sm text-gray-400">Support for ZIP, XML, JSON, and JS files</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <Link
                  href="/admin/bots"
                  className="px-6 py-3 border border-white/20 rounded-md text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-md font-medium hover:opacity-90 transition-opacity ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Uploading..." : "Upload Bot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
