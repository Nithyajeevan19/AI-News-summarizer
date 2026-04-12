"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative pt-40 pb-16 px-8 text-center">
      {/* Overline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase mb-6"
      >
        ✦ AI-Powered News Digest ✦
      </motion.p>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-syne font-black text-6xl md:text-8xl text-white leading-none mb-6"
      >
        Stay{" "}
        <span className="relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink animate-gradient-shift bg-[length:200%]">
            wired.
          </span>
          {/* underline glow */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple"
          />
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-mono text-white/40 text-sm max-w-md mx-auto leading-relaxed"
      >
        cutting-edge AI news — summarized, curated, delivered.
        no fluff. just signal.
      </motion.p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex items-center justify-center gap-8 mt-10"
      >
        {[
          { label: "Sources", value: "50+" },
          { label: "Updated", value: "Daily" },
          { label: "Summaries", value: "AI" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-syne font-bold text-xl text-neon-cyan text-glow-cyan">
              {stat.value}
            </div>
            <div className="font-mono text-xs text-white/25 uppercase tracking-widest mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}