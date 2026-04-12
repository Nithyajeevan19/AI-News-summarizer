"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock, Zap } from "lucide-react";

interface NewsCardProps {
  title: string;
  summary: string;
  link: string;
  source: string;
  date: string;
  index: number;
  category?: string;
}

export default function NewsCard({
  title, summary, link, source, date, index, category = "AI"
}: NewsCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass glass-hover rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
    >
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-1.5 text-xs font-mono text-neon-cyan border border-neon-cyan/20 bg-neon-cyan/5 px-3 py-1 rounded-full">
          <Zap size={10} className="animate-pulse-glow" />
          {category}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-mono text-white/30">
          <Clock size={10} />
          {date}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-syne font-bold text-lg text-white mb-3 leading-tight group-hover:text-neon-cyan transition-colors duration-300">
        {title}
      </h2>

      {/* Summary */}
      <p className="text-white/50 text-sm leading-relaxed mb-5 font-mono">
        {summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-white/25 uppercase tracking-wider">
          {source}
        </span>
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 text-xs font-mono text-neon-cyan border border-neon-cyan/30 px-3 py-1.5 rounded-lg hover:bg-neon-cyan/10 transition-all duration-200"
        >
          Read more <ExternalLink size={10} />
        </motion.a>
      </div>

      {/* Corner glow on hover */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-neon-purple/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.article>
  );
}