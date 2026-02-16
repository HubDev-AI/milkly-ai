import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-8 md:px-12">
            <div className="flex items-center gap-12 font-bold tracking-[0.3em] text-[10px] md:text-xs">
                <span className="opacity-50 uppercase">RENEWED</span>
                <span className="opacity-50 uppercase">GENERATOR</span>
            </div>
            
            <Link to="/" className="flex flex-col items-center group">
                <h1 className="text-2xl md:text-3xl font-display font-black tracking-tighter group-hover:tracking-widest transition-all duration-700">
                    MILKLY
                </h1>
                <span className="text-[8px] font-bold tracking-[0.5em] opacity-50 mt-1">AI LABS</span>
            </Link>
            
            <div className="flex items-center gap-12 font-bold tracking-[0.3em] text-[10px] md:text-xs">
                <span className="opacity-50 uppercase">MILKLY</span>
                <span className="opacity-50 uppercase">2026</span>
            </div>
        </nav>
    );
};
