"use client";

import { useState, useEffect } from "react";

type ToastType = 'success' | 'error' | null;

interface Toast {
  type: ToastType;
  message: string;
}

export default function HomePage() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<Toast>({ type: null, message: '' });

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: null, message: '' }), 3000);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResultUrl(null);
    setLoading(true);

    try {
      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          ttl_seconds: ttl ? Number(ttl) : undefined,
          max_views: maxViews ? Number(maxViews) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create paste");

      setResultUrl(data.url);
      setContent("");
      setTtl("");
      setMaxViews("");
      showToast('success', 'Paste created successfully!');
    } catch (err: any) {
      showToast('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = async () => {
    if (resultUrl) {
      try {
        await navigator.clipboard.writeText(resultUrl);
        setCopied(true);
        showToast('success', 'URL copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        showToast('error', 'Failed to copy URL');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Toast Notification */}
      {toast.type && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-500 text-white border border-emerald-400' 
            : 'bg-rose-500 text-white border border-rose-400'
        }`}>
          <div className="flex items-center space-x-2">
            {toast.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a Paste</h1>
        <p className="text-gray-600">Share code snippets and text securely with optional expiration</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Paste Content <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="content"
              placeholder="Paste your code or text here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical font-mono text-sm transition-all duration-200 bg-gray-50/50 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="ttl" className="block text-sm font-medium text-gray-700 mb-2">
                Time to Live (TTL)
              </label>
              <input
                id="ttl"
                type="number"
                min={1}
                placeholder="e.g., 3600 (1 hour)"
                value={ttl}
                onChange={(e) => setTtl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
              />
              <p className="mt-1 text-xs text-gray-500">Optional: Seconds until paste expires</p>
            </div>

            <div>
              <label htmlFor="maxViews" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Views
              </label>
              <input
                id="maxViews"
                type="number"
                min={1}
                placeholder="e.g., 100"
                value={maxViews}
                onChange={(e) => setMaxViews(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
              />
              <p className="mt-1 text-xs text-gray-500">Optional: Number of times paste can be viewed</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating Paste...</span>
              </>
            ) : (
              <span>Create Paste</span>
            )}
          </button>
        </form>

        {resultUrl && (
          <div className="mt-6 p-4 bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg relative">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-emerald-800 font-medium">Paste created successfully!</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={resultUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-mono shadow-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-linear-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
