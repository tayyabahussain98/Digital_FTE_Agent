"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setPost("");

    try {
      const response = await fetch("https://tayyaba98-digital-fte-agent-backend.hf.space/generate-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topic.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setPost(data.post || data.content || JSON.stringify(data, null, 2));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate post. Is the backend running?"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Digital FTE Agent
              </h1>
              <p className="text-sm text-gray-500">
                AI-Powered LinkedIn Post Generator
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        {/* Input Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Topic
          </label>
          <div className="flex gap-3">
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. AI trends in 2026, startup fundraising tips..."
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         placeholder:text-gray-400 transition-colors"
              disabled={loading}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Generate Post
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Generated Post */}
        {post && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-700">
                Generated LinkedIn Post
              </h2>
              <button
                onClick={() => navigator.clipboard.writeText(post)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium
                           flex items-center gap-1 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {post}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <p className="text-xs text-gray-400 text-center">
            Digital FTE Agent &mdash; Powered by AI
          </p>
        </div>
      </footer>
    </div>
  );
}
