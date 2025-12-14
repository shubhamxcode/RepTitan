import React from "react";
import { cn } from "@/lib/utils";

interface GlitchEffectProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({
  text,
  className,
  as: Component = "span",
}) => {
  return (
    <Component
      className={cn(
        "relative inline-block hover:animate-pulse",
        className
      )}
      data-text={text}
    >
      <span className="relative z-10">{text}</span>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 -z-10 w-full translate-x-[2px] text-red-500 opacity-70 mix-blend-multiply clip-path-inset-1"
        style={{
          clipPath: "inset(0 0 0 0)",
          animation: "glitch 2s infinite linear alternate-reverse",
        }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 -z-10 w-full -translate-x-[2px] text-blue-500 opacity-70 mix-blend-multiply clip-path-inset-2"
        style={{
          clipPath: "inset(0 0 0 0)",
          animation: "glitch 3s infinite linear alternate-reverse",
        }}
      >
        {text}
      </span>
      <style>{`
        @keyframes glitch {
          0% {
            clip-path: inset(20% 0 80% 0);
          }
          20% {
            clip-path: inset(60% 0 10% 0);
          }
          40% {
            clip-path: inset(40% 0 50% 0);
          }
          60% {
            clip-path: inset(80% 0 5% 0);
          }
          80% {
            clip-path: inset(10% 0 60% 0);
          }
          100% {
            clip-path: inset(30% 0 30% 0);
          }
        }
      `}</style>
    </Component>
  );
};
