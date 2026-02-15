"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from 'next/navigation';

import { Mic, Search } from "lucide-react";
import { motion } from "framer-motion";

interface QueryResponse {
    query_id: number;
    query_text: string;
    detected_intent: string;
    response_text: string;
}

const QueryBoxContent: React.FC = () => {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<QueryResponse | null>(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-IN';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setQuery(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        const handleDockVoice = () => {
            toggleVoice();
        };
        window.addEventListener("activate-voice", handleDockVoice);
        return () => window.removeEventListener("activate-voice", handleDockVoice);
    }, []);

    // Seperate effect for search params to ensure it triggers on every navigation
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            setQuery(q);
            // Auto-submit if q is present
            const fakeEvent = { preventDefault: () => { } } as React.FormEvent;
            handleSubmit(fakeEvent, q);
        } else {
            // Reset state if no q
            setQuery("");
            setResponse(null);
            setError(null);
        }
    }, [searchParams]);

    const toggleVoice = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            setError(null);
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (err) {
                console.error("Recognition start error:", err);
                setIsListening(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent, overrideQuery?: string) => {
        e.preventDefault();
        const activeQuery = overrideQuery || query;
        if (!activeQuery) return;

        setLoading(true);
        // Do not clear response immediately to avoid flickering if it's the same query
        if (!overrideQuery) setResponse(null);
        setError(null);

        try {
            const res = await fetch(`http://localhost:8000/query?query_text=${encodeURIComponent(activeQuery)}`, {
                method: "POST",
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`API Error: ${errorText || "Server unreachable"}`);
            }

            const data = await res.json();

            let attempts = 0;
            const pollInterval = setInterval(async () => {
                attempts++;
                if (attempts > 30) {
                    clearInterval(pollInterval);
                    setLoading(false);
                    setError("SetuAI is taking longer than usual. Please retry.");
                    return;
                }

                try {
                    const pollRes = await fetch(`http://localhost:8000/query/${data.query_id}`);
                    if (!pollRes.ok) throw new Error("Connection failed");
                    const pollData = await pollRes.json();

                    if (pollData.response_text) {
                        setResponse(pollData);
                        setLoading(false);
                        clearInterval(pollInterval);
                    }
                } catch (err) {
                    console.error("Polling error:", err);
                    // Don't kill the interval on one-off network glitch
                }
            }, 1500);
        } catch (err: any) {
            console.error("Submit error:", err);
            setLoading(false);
            setError(err.message || "Cannot connect to SetuAI Hub.");
        }
    };

    const clearSearch = () => {
        setQuery("");
        setResponse(null);
        setError(null);
        // Remove q from URL if present
        window.history.pushState({}, '', '/');
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-16 relative">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('search_placeholder')}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-16 pr-44 text-lg focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-700 font-light"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="p-2 text-zinc-600 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-widest"
                        >
                            {t('clear') || 'Clear'}
                        </button>
                    )}
                    <div className="relative">
                        {isListening && (
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-blue-500 rounded-full blur-xl"
                            />
                        )}
                        <motion.button
                            type="button"
                            onClick={toggleVoice}
                            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ repeat: isListening ? Infinity : 0, duration: 1 }}
                            className={`relative p-3 rounded-xl transition-all z-10 ${isListening ? "bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "text-zinc-500 hover:text-white hover:bg-white/5"}`}
                        >
                            <Mic size={18} />
                        </motion.button>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm tracking-tight transition-all disabled:opacity-50 hover:bg-zinc-200 active:scale-95"
                    >
                        {loading ? "..." : t('search_placeholder').split(' ').pop()}
                    </button>
                </div>
            </form>

            {error && (
                <div className="mt-4 text-center">
                    <div className="text-red-500/80 font-mono text-[10px] uppercase tracking-widest animate-pulse mb-2">
                        {error}
                    </div>
                    <button
                        onClick={() => handleSubmit({ preventDefault: () => { } } as React.FormEvent)}
                        className="text-[10px] text-zinc-500 hover:text-white underline font-mono uppercase tracking-widest"
                    >
                        Retry Connection
                    </button>
                </div>
            )}

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

const QueryBox: React.FC = () => {
    return (
        <Suspense fallback={<div className="w-full h-24 glass animate-pulse rounded-2xl" />}>
            <QueryBoxContent />
        </Suspense>
    );
};

export default QueryBox;
