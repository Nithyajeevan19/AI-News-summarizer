"use client";

import { motion } from "framer-motion";
import { Rss, Sparkles } from "lucide-react";
interface NavbarProps {
  isLive?: boolean;
  updatedAt?: string | null;
}

export default function Navbar({ isLive = false }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
    >
      {/* Glass background */}
      <div className="absolute inset-0 glass border-b border-white/5" />

      {/* Logo */}
      <div className="relative flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center glow-cyan">
          <Rss size={14} className="text-neon-cyan" />
        </div>
        <span className="font-syne font-bold text-white tracking-tight">
          news<span className="text-neon-cyan text-glow-cyan">.ai</span>
        </span>
      </div>

      {/* Status pill */}
      <div className="relative flex items-center gap-2 font-mono text-xs text-white/40 border border-white/10 px-4 py-2 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
        Live Feed
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-2 text-xs font-mono text-white/30">
        <Sparkles size={12} className="text-neon-purple" />
        Powered by Gemini
      </div>
    </motion.nav>
  );
}