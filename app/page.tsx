"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";

interface Article {
  title: string;
  summary: string;
  link: string;
  source: string;
  date: string;
  category: string;
}

// Fallback mock data shown before n8n sends anything
const MOCK_NEWS: Article[] = [
  {
    title: "Anthropic's Glasswing Highlights AI's Security Paradox",
    summary: "Anthropic launched Glasswing, a new initiative leveraging AI to identify security vulnerabilities.",
    link: "https://aibusiness.com",
    source: "aibusiness.com",
    date: "Apr 10",
    category: "Security",
  },
  {
    title: "Intel Secures New AI Infrastructure Deal With Google",
    summary: "Intel announced a new AI infrastructure agreement with Google, joining a growing wave of major tech partnerships.",
    link: "https://aibusiness.com",
    source: "aibusiness.com",
    date: "Apr 10",
    category: "Infrastructure",
  },
];

export default function Home() {
  const [articles, setArticles] = useState<Article[]>(MOCK_NEWS);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();

        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          setUpdatedAt(data.updatedAt);
          setIsLive(true);
        }
      } catch (err) {
        console.log("Using mock data");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen bg-dark-900 noise">
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar isLive={isLive} updatedAt={updatedAt} />
        <Hero articleCount={articles.length} />

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
              {isLive ? "Live Summaries" : "Sample Summaries"}
            </span>
            {!isLive && (
              <span className="font-mono text-xs text-neon-pink/50 border border-neon-pink/20 px-2 py-0.5 rounded-full">
                waiting for n8n
              </span>
            )}
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                  <div className="h-3 bg-white/5 rounded mb-4 w-1/3" />
                  <div className="h-5 bg-white/5 rounded mb-3" />
                  <div className="h-3 bg-white/5 rounded mb-2" />
                  <div className="h-3 bg-white/5 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, i) => (
                  <NewsCard key={i} {...article} index={i} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </section>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center pb-10 font-mono text-xs text-white/15"
        >
          built with n8n + gemini + next.js ✦{" "}
          {updatedAt
            ? `last updated ${new Date(updatedAt).toLocaleTimeString()}`
            : "auto-updated daily"}
        </motion.footer>
      </div>
    </main>
  );
}