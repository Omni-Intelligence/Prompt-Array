import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ArrayElement = ({ x, y, size, content, rotation }) => (
  <div 
    className="absolute rounded-md bg-[#9333EA]/[0.02] dark:bg-[#9333EA]/[0.03]"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-[#9333EA]/[0.03] dark:ring-[#9333EA]/[0.05] flex items-center justify-center text-[#9333EA]/20 dark:text-[#9333EA]/30 font-mono text-sm">
      {content}
    </div>
  </div>
);

// Static array content and positions
const ARRAY_CONTENT = [
  "AI", "GPT", "LLM", "NLP", "[]", "{}", "()", "<>",
  "0x", "=>", "fn", "let", "var", "for", "map", "if"
];

const POSITIONS = [
  { x: 5, y: 15, rotation: 15 }, { x: 85, y: 20, rotation: 45 }, 
  { x: 15, y: 75, rotation: -30 }, { x: 90, y: 65, rotation: 20 },
  { x: 10, y: 45, rotation: -15 }, { x: 80, y: 40, rotation: 35 }, 
  { x: 25, y: 85, rotation: 25 }, { x: 75, y: 80, rotation: -25 },
  { x: 20, y: 30, rotation: -20 }, { x: 70, y: 25, rotation: 15 }, 
  { x: 30, y: 60, rotation: 40 }, { x: 65, y: 70, rotation: -35 },
  { x: 40, y: 15, rotation: -45 }, { x: 60, y: 85, rotation: 30 }, 
  { x: 35, y: 40, rotation: 10 }, { x: 55, y: 55, rotation: -10 }
].map((pos, i) => ({
  ...pos,
  size: 35 + (i % 3) * 10,
  content: ARRAY_CONTENT[i % ARRAY_CONTENT.length]
}));

const BracketDecoration = ({ left }) => (
  <div 
    className={`absolute top-1/2 -translate-y-1/2 ${left ? 'left-0' : 'right-0'} text-8xl text-[#9333EA]/10 dark:text-[#9333EA]/20 font-mono animate-pulse`}
    style={{ writingMode: 'vertical-rl' }}
  >
    {left ? '['.repeat(5) : ']'.repeat(5)}
  </div>
);

const StepButton = ({ number, text }) => (
  <button className="bg-[#9333EA]/5 rounded-md px-7 py-3 relative group transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[#9333EA]/10 border border-[#9333EA]/10">
    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#9333EA]/5 to-[#C084FC]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    <span className="absolute -top-3 -left-1 text-sm font-medium text-[#9333EA] tracking-wide">[{number}]</span>
    <span className="text-gray-700 text-base font-medium relative z-10">{text}</span>
    <div className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-[#9333EA] via-[#C084FC] to-[#9333EA] opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
);

const TypewriterText = ({ text, delay = 2000 }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);
  
  return (
    <span className="font-mono">
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  );
};

export function Hero() {
  return (
    <div className="relative pt-28 pb-16">
      <div className="relative flex flex-col items-center max-w-5xl mx-auto px-4">
        {/* Background Elements */}
        {POSITIONS.map((props, index) => (
          <ArrayElement key={index} {...props} />
        ))}
        
        {/* Main Content */}
        <div className="text-center space-y-8 mb-14">
          <h1 className="text-7xl font-bold leading-tight tracking-tight">
            <div className="bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent inline-block">
              Your AI Prompts,
            </div>
            <div className="bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent inline-block mt-2">
              Perfectly <TypewriterText text="Arranged" delay={500} />
            </div>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed bg-[#9333EA]/5 rounded-lg p-4 border border-[#9333EA]/10">
            Create, organize, and share powerful AI prompts. Boost your productivity
            with our intuitive prompt management platform.
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-6 mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9333EA]/20 to-transparent blur-xl" />
          <StepButton number="0" text="Create" />
          <StepButton number="1" text="Organize" />
          <StepButton number="2" text="Chain" />
          <StepButton number="3" text="Share" />
          <StepButton number="4" text="Iterate" />
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-5">
          <Link
            to="/signup"
            className="group relative overflow-hidden bg-[#9333EA] text-white px-8 py-3.5 rounded-md transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[#9333EA]/25 text-lg font-medium"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA] to-[#C084FC] opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <span className="relative flex items-center gap-2">
              Get Started
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
          <Link
            to="/app/dashboard"
            className="group relative bg-[#9333EA]/5 text-gray-700 px-8 py-3.5 rounded-md transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[#9333EA]/10 border border-[#9333EA]/10"
          >
            <span className="relative">Go to Dashboard</span>
            <div className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-[#9333EA] via-[#C084FC] to-[#9333EA] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </div>
  );
}
