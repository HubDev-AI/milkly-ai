import { useMemo } from "react";
import { ExternalLink, RefreshCcw } from "lucide-react";
import { APP_URL } from "@/lib/config";

interface NewsletterPreviewProps {
    prompt: string;
    onReset: () => void;
}

export const NewsletterPreview = ({ prompt, onReset }: NewsletterPreviewProps) => {
    const processId = useMemo(() => Math.floor(Math.random() * 900000 + 100000), []);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-[4/5] overflow-hidden group">
                    <img
                        src="/newsletter_result_gen.png"
                        alt="Generated Newsletter"
                        loading="lazy"
                        className="w-full h-full object-cover grayscale-0 scale-100"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <span className="text-white font-display text-4xl font-black tracking-widest">PREVIEW</span>
                    </div>
                </div>
                
                <div className="space-y-8">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.5em] text-white/50 uppercase block mb-4">
                            [ GENERATION RESULT ]
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight uppercase">
                            YOUR NEWSLETTER IS <br/>
                            <span className="text-white/50">READY FOR DEPLOY.</span>
                        </h2>
                    </div>
                    
                    <p className="text-white/50 font-medium leading-relaxed max-w-md">
                        Based on your prompt: <span className="text-white italic">"{prompt}"</span>, we've curated the most relevant signals and synthesized them into a premium editorial layout.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a 
                            href={APP_URL}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-premium flex-1 group"
                        >
                            OPEN IN MILKLY APP
                            <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <button 
                            onClick={onReset}
                            className="inline-flex items-center justify-center px-8 py-4 border border-white/5 hover:border-white/20 text-white/50 hover:text-white transition-all text-xs font-bold tracking-widest uppercase"
                        >
                            GENERATE ANOTHER
                            <RefreshCcw className="ml-2 w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* System Log Style Extra Info */}
            <div className="mt-24 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-30 font-bold tracking-[0.2em] text-[8px] uppercase">
                <div className="flex flex-col gap-1">
                    <span className="text-white/40">Tokens Used</span>
                    <span>1,424_PRIME</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-white/40">Sources Scanned</span>
                    <span>34_GLOBAL_NODES</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-white/40">Model Context</span>
                    <span>MILKLY_XL_V2</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-white/40">Process ID</span>
                    <span>#{processId}</span>
                </div>
            </div>
        </div>
    );
};
