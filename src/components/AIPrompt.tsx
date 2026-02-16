import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIPromptProps {
    onGenerate: (prompt: string) => void;
    isLoading: boolean;
}

export const AIPrompt = ({ onGenerate, isLoading }: AIPromptProps) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim() && !isLoading) {
            onGenerate(value);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-24">
            <form onSubmit={handleSubmit} className="relative group">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    maxLength={500}
                    placeholder="DESCRIBE YOUR NEWSLETTER..."
                    className={cn(
                        "w-full bg-transparent border-b-2 border-white/10 py-8 md:py-12 px-2 text-2xl md:text-5xl font-display font-light placeholder:opacity-20 translate-all duration-700 outline-none",
                        "focus:border-white focus:placeholder:opacity-0 focus:pl-4",
                        isLoading && "opacity-50 pointer-events-none"
                    )}
                />
                <button 
                    type="submit"
                    disabled={!value.trim() || isLoading}
                    className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center border border-white/20 transition-all duration-700",
                        value.trim() ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none",
                        "hover:bg-white hover:text-black hover:border-white"
                    )}
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-current border-t-transparent animate-spin" />
                    ) : (
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                    )}
                </button>
            </form>
            
            <div className="mt-8 flex justify-center gap-8 opacity-30 font-bold tracking-[0.3em] text-[8px] md:text-[10px]">
                <span className="uppercase">PRESS ENTER TO GENERATE</span>
                <span className="uppercase">V1.0.42_STABLE</span>
            </div>
        </div>
    );
};
