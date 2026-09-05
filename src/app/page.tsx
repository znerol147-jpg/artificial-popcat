"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import { Copy, Check, Send, Activity, Shield, Zap, ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";

// --- ANIMATION VARIANTS ---
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- ICONS ---
const XLogo = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// --- COMPONENTS ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["About", "Tokenomics", "Roadmap", "How to Buy"];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/80 backdrop-blur-md border-b border-neon/20 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <span className="text-white">AI</span>
          <span className="text-neon drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]">
            POPCAT
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center font-medium text-sm text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="hover:text-neon transition-colors duration-200"
            >
              {link}
            </a>
          ))}
          <a
            href="#buy"
            className="bg-neon text-black px-5 py-2 rounded-full font-bold hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] transition-all duration-300"
          >
            Buy $POPCAT
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark-surface border-b border-neon/20 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-white hover:text-neon"
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [copied, setCopied] = useState(false);
  const contractAddress = "0xA777885fe03946bfec7E039f56f359f6B139c171";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon/10 via-dark to-dark -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon/20 blur-[120px] rounded-full -z-10 animate-pulse-slow" />

      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="text-center lg:text-left z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div
              variants={fadeInUp}
              className="inline-block border border-neon/50 bg-neon/10 text-neon px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(57,255,20,0.2)]"
            >
              Built for the Robinhood Meta 🚀
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black leading-tight mb-6"
            >
              ARTIFICIAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400 drop-shadow-[0_0_25px_rgba(57,255,20,0.6)]">
                POPCAT
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              The internet&apos;s most iconic screaming cat, upgraded with AI. Neon green eyes. Zero
              fear. Maximum memes. It doesn&apos;t meow. It pumps.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <button className="bg-neon text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] flex items-center justify-center gap-2 group">
                Buy Now <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://x.com/artificiaPopcat"
                target="_blank"
                rel="noreferrer"
                className="border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <XLogo size={20} /> Raid X
              </a>
            </motion.div>

            {/* Contract Address Copy */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center lg:justify-start gap-2 bg-dark-surface border border-white/10 p-2 rounded-lg max-w-md mx-auto lg:mx-0"
            >
              <span className="text-gray-500 font-mono text-xs sm:text-sm truncate px-2">
                {contractAddress}
              </span>
              <button
                onClick={copyToClipboard}
                className="bg-white/10 hover:bg-neon hover:text-black p-2 rounded text-white transition-colors"
                aria-label="Copy contract address"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md aspect-square z-10"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-neon/30 shadow-[0_0_50px_rgba(57,255,20,0.3)] bg-dark-surface"
          >
            <Image
              src="/popcat.jpg"
              alt="Artificial Popcat"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay opacity-30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const features = [
    {
      icon: <Activity className="text-neon mb-2" size={32} />,
      title: "Hyper-Optimized",
      desc: "Built for speed and volatility."
    },
    {
      icon: <Shield className="text-neon mb-2" size={32} />,
      title: "Unruggable AI",
      desc: "Contract renounced, LP burned."
    },
    {
      icon: <Zap className="text-neon mb-2" size={32} />,
      title: "Zero Taxes",
      desc: "0/0 limits. Pure momentum."
    },
    {
      icon: <XLogo className="text-neon mb-2" size={32} />,
      title: "X Raids",
      desc: "Programmed to dominate timelines."
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-dark-surface border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon/10 blur-[80px] rounded-full" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                THE <span className="text-neon">UPGRADE</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                ARTIFICIAL POPCAT was created in the depths of a neural network fed exclusively on
                green candles and Robinhood charts. The biological limitations of the original meme
                have been stripped away.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                We replaced the vocal cords with algorithmic trading APIs. We replaced the fur with
                liquid cooling. It doesn&apos;t scream for food anymore; it screams through timelines
                to raid X and bring meme energy to the blockchain.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-black/50 border border-white/5 p-6 rounded-2xl hover:border-neon/50 transition-colors"
                >
                  {feature.icon}
                  <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Tokenomics = () => {
  const stats = [
    { title: "Total Supply", value: "1B", label: "Tokens minted" },
    { title: "Buy/Sell Tax", value: "1%", label: "Zero friction" },
    { title: "Liquidity", value: "Burned", label: "Forever locked" }
  ];

  return (
    <section id="tokenomics" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            TOKEN<span className="text-neon">OMICS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            No complex math. Just simple, aggressive mechanics designed for the Robinhood launch
            meta.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-dark-surface border border-white/10 p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-gray-400 font-semibold mb-2">{stat.title}</h3>
              <div className="text-5xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:text-neon transition-colors">
                {stat.value}
              </div>
              <p className="text-sm text-neon/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1: Boot Sequence",
      items: ["Website Launch & Socials", "Contract Deployment", "Initial X Raid Protocols", "DEX Listings"]
    },
    {
      phase: "Phase 2: Network Override",
      items: [
        "CoinGecko/CoinMarketCap Fast-Track",
        "Trending on Web3 Platforms",
        "Community AI Meme Generation",
        "10k+ Holders Target"
      ]
    },
    {
      phase: "Phase 3: Robinhood Meta",
      items: [
        "Tier-1 CEX Pursuits",
        "Mainstream Media Infiltration",
        "Total Timeline Domination",
        "The Ultimate Green Candle"
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-black text-center mb-16"
        >
          SYSTEM <span className="text-neon">ROADMAP</span>
        </motion.h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-neon/50 before:to-transparent">
          {phases.map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline Node */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-dark bg-neon text-black shadow-[0_0_15px_rgba(57,255,20,0.8)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Zap size={16} fill="currentColor" />
              </div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-dark-surface border border-white/10 p-6 rounded-2xl shadow-xl hover:border-neon/50 transition-colors">
                <h3 className="text-xl font-bold text-white mb-4">{phase.phase}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400">
                      <ChevronRight size={18} className="text-neon shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-dark pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
          <div>
            <div className="text-3xl font-black tracking-tighter flex items-center gap-2 mb-4">
              <span className="text-white">AI</span>
              <span className="text-neon drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]">
                POPCAT
              </span>
            </div>
            <p className="text-gray-500 max-w-sm">
              The AI-upgraded screaming cat built for the Robinhood meta. Zero fear. Maximum memes.
            </p>
          </div>
          <div className="flex gap-4 md:justify-end">
            <a
              href="https://x.com/artificiaPopcat"
              aria-label="X profile"
              className="bg-dark-surface border border-white/10 p-3 rounded-xl hover:bg-neon hover:text-black hover:border-neon transition-all"
            >
              <XLogo size={24} />
            </a>
            <a
              href="https://t.me/ArtificialPopcatrh"
              aria-label="Telegram channel"
              className="bg-dark-surface border border-white/10 p-3 rounded-xl hover:bg-neon hover:text-black hover:border-neon transition-all"
            >
              <Send size={24} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Artificial Popcat. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            Disclaimer: $POPCAT is a meme coin with no intrinsic value or expectation of financial
            return. There is no formal team or roadmap. The coin is completely useless and for
            entertainment purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="bg-dark min-h-screen text-white font-sans selection:bg-neon selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Tokenomics />
      <Roadmap />
      <Footer />
    </main>
  );
}