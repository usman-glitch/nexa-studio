"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";

export default function AiAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState("");
  const [messages, setMessages] = useState<{id: string, role: 'user' | 'assistant', content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim()) return;

    const userMessage = { 
      id: Date.now().toString(), 
      role: "user" as const, 
      content: localInput 
    };

    setMessages(prev => [...prev, userMessage]);
    const inputValue = localInput;
    setLocalInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      console.log('Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(errorText);
      }

      // SIMPLIFIED STREAMING - PERFECT FOR toTextStreamResponse()
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullResponse += chunk;

            // Update UI with complete response so far
            setMessages(prev => {
              const newMessages = prev.slice(0, -1); // Remove loading
              newMessages.push({
                id: (Date.now() + 1).toString(),
                role: "assistant" as const,
                content: fullResponse
              });
              return newMessages;
            });
          }
        } finally {
          reader.releaseLock();
        }
      }

    } catch (error: any) {
      console.error('Error:', error);
      setMessages(prev => [...prev.slice(0, -1), {
        id: (Date.now() + 2).toString(),
        role: "assistant" as const,
        content: `Error: ${error.message}`
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [localInput, messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-24 right-6 z-[100000] pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mb-4 w-[350px] md:w-[420px] h-[600px] bg-black/90 border border-white/10 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-[#00887a]/20 to-transparent flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="w-6 h-6 text-[#00887a]" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00887a] animate-ping" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white">NEXA Core</h3>
                  <p className="text-[10px] text-gray-500 font-medium italic">Artificial Intelligence v1.0</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <Sparkles className="text-[#00887a]/20 w-12 h-12" />
                  <p className="text-gray-500 text-sm max-w-[200px] font-medium leading-relaxed">
                    System online. How can NEXA help evolve your digital presence?
                  </p>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user" 
                        ? "bg-[#00887a] text-black font-bold shadow-[0_4px_20px_rgba(0,136,122,0.3)] rounded-br-none" 
                        : "bg-white/5 text-gray-300 border border-white/10 backdrop-blur-md rounded-bl-none"
                    }`}>
                    <p className="whitespace-pre-wrap">{m.content}</p>
                    <span className={`text-[9px] uppercase mt-2 block opacity-40 font-black tracking-tighter ${m.role === "user" ? "text-black/60" : "text-white/60"}`}>
                      {m.role === "user" ? "Client" : "NEXA Intelligence"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSubmit} className="p-6 bg-white/5 border-t border-white/5">
              <div className="relative group">
                <input
                  type="text"
                  value={localInput}
                  onChange={(e) => setLocalInput(e.target.value)}
                  placeholder="Inquire about branding..."
                  className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00887a]/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!localInput.trim() || isLoading}
                  className="absolute right-3 top-2.5 p-2 bg-[#00887a] rounded-xl text-black hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-lg"
                >
                  <Send size={18} strokeWidth={2.5} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 136, 122, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-white text-black" : "bg-[#00887a] text-black"
        }`}
      >
        {isOpen ? <X size={24} strokeWidth={3} /> : <MessageSquare size={24} strokeWidth={2.5} />}
      </motion.button>
    </div>
  );
}