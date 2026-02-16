import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { NewsletterMarquee } from "../components/NewsletterMarquee";
import { AIPrompt } from "../components/AIPrompt";
import { NewsletterPreview } from "../components/NewsletterPreview";
import { APP_URL } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function Home() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [resultPrompt, setResultPrompt] = useState<string | null>(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Simple entrance animation
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleGenerate = (prompt: string) => {
        setIsGenerating(true);
        // Simulate AI processing
        setTimeout(() => {
            setIsGenerating(false);
            setResultPrompt(prompt);
            // Scroll to result
            window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }, 3000);
    };

    const handleReset = () => {
        setResultPrompt(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={cn(
            "min-h-screen bg-background text-foreground relative overflow-x-hidden",
            "transition-opacity duration-1000",
            showContent ? "opacity-100" : "opacity-0"
        )}>
            {/* Global Grain Overlay */}
            <div className="noise-overlay" />
            
            <Nav />

            <main className="pt-32">
                {/* Hero Section */}
                <section className="px-8 md:px-12 py-12 md:py-24 text-center">
                    <div className="max-w-6xl mx-auto">
                        <span className="text-[10px] font-bold tracking-[0.5em] text-white/50 uppercase block mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            [ AI_POWERED_EDITORIAL_ENGINE ]
                        </span>
                        
                        <h1 className="text-6xl md:text-[12vw] leading-[0.75] font-display font-black tracking-tighter uppercase mb-12">
                            SYNTHESIZE <br/>
                            <span className="text-white/20">THE SIGNAL.</span>
                        </h1>
                        
                        <p className="text-white/40 font-medium text-sm md:text-xl max-w-2xl mx-auto leading-relaxed uppercase tracking-wider">
                            Milkly AI transforms raw prompts into high-fidelity newsletter artifacts. 
                            Professional curation, automated at the speed of thought.
                        </p>
                    </div>
                </section>

                {/* The Marquee Showcase */}
                <div className="relative">
                    <div className="absolute inset-x-0 top-0 h-px bg-white/5" />
                    <NewsletterMarquee />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-white/5" />
                </div>

                {/* AI Interaction Area */}
                <AIPrompt onGenerate={handleGenerate} isLoading={isGenerating} />

                {/* Result Area */}
                {resultPrompt && (
                    <NewsletterPreview prompt={resultPrompt} onReset={handleReset} />
                )}

                {/* Redirect Footer Call to Action */}
                {!resultPrompt && (
                    <section className="px-8 md:px-12 py-24 text-center border-t border-white/5">
                        <div className="max-w-4xl mx-auto space-y-12">
                            <h3 className="text-4xl md:text-6xl font-display font-bold uppercase">
                               READY TO <br/>
                               <span className="text-white/20 text-[0.8em]">MANAGE YOUR FLUX?</span>
                            </h3>
                            <a 
                                href={APP_URL}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn-premium group"
                            >
                                EXPLORE MILKLY ECOSYSTEM
                            </a>
                        </div>
                    </section>
                )}
            </main>

            {/* Global Meta Info */}
            <div className="fixed bottom-8 left-8 z-50 mix-blend-difference hidden md:block">
               <span className="text-[8px] font-bold tracking-[0.5em] opacity-30 uppercase">SYSTEM_STABLE // 2026.LABS</span>
            </div>
            
            <div className="fixed bottom-8 right-8 z-50 mix-blend-difference hidden md:block">
               <span className="text-[8px] font-bold tracking-[0.5em] opacity-30 uppercase">MADE_WITH_MILK_AND_INTELLIGENCE</span>
            </div>
        </div>
    );
}
