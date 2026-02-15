"use client";
import React, { useState } from 'react';

const QueryBox: React.FC = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        setResponse(null);

        try {
            const res = await fetch(`http://localhost:8000/query?query_text=${encodeURIComponent(query)}`, {
                method: "POST",
            });
            const data = await res.json();

            // Poll for response
            const pollInterval = setInterval(async () => {
                const pollRes = await fetch(`http://localhost:8000/query/${data.query_id}`);
                const pollData = await pollRes.json();

                if (pollData.response_text) {
                    setResponse(pollData);
                    setLoading(false);
                    clearInterval(pollInterval);
                }
            }, 2000);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-16">
            <form onSubmit={handleSubmit} className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me anything... (e.g., 'What are my rights upon arrest?' or 'Wheat price in Punjab')"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 pr-32 text-lg focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600 shadow-2xl"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                    {loading ? "..." : "Ask Setu"}
                </button>
            </form>

            {response && (
                <div className="mt-8 glass p-8 rounded-2xl border border-blue-500/20 animate-in slide-in-from-top duration-500">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 uppercase tracking-widest">
                            {response.detected_intent} Agent
                        </span>
                    </div>
                    <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {response.response_text}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QueryBox;
