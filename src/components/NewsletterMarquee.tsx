

interface MarqueeItemProps {
    image: string;
    label1: string;
    label2?: string;
}

const MarqueeItem = ({ image, label1, label2 }: MarqueeItemProps) => (
    <div className="relative flex-shrink-0 w-[400px] md:w-[600px] aspect-[16/10] mx-4 group overflow-hidden">
        <img
            src={image}
            alt="Newsletter Sample"
            loading="lazy"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Glassmorphic Labels */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <div className="px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                {label1}
            </div>
            {label2 && (
                <div className="px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                    {label2}
                </div>
            )}
        </div>
    </div>
);

export const NewsletterMarquee = () => {
    const items: MarqueeItemProps[] = [
        { image: "/newsletter_sample_1.png", label1: "EFFECTIVE", label2: "PRODUCTIVITY" },
        { image: "/newsletter_sample_2.png", label1: "VISUAL", label2: "EXPRESSIVE" },
        { image: "/newsletter_sample_1.png", label1: "INSIGHTFUL", label2: "DATA-DRIVEN" },
        { image: "/newsletter_sample_2.png", label1: "MINIMAL", label2: "SLEEK" },
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Fixed Labels */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase vertical-text opacity-50">UX / UI</span>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase vertical-text opacity-50">SAMPLES</span>
            </div>

            <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
                {/* Double for seamless scroll */}
                {[...items, ...items].map((item, idx) => (
                    <MarqueeItem key={idx} {...item} />
                ))}
            </div>
            
            <style>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                }
            `}</style>
        </section>
    );
};
