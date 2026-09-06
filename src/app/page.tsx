"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Copy, Check, Send, Activity, Shield, Zap, ChevronRight, Menu, X, Rocket, Orbit } from 'lucide-react';
import Image from 'next/image';

// --- CUSTOM ICONS ---
const XLogo = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// --- COMPONENTS ---
const Starfield = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-dark pointer-events-none">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-stars" />
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ["About", "Tokenomics", "Roadmap", "Buy"];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <span className="text-white">AI</span>
          <span className="text-transparent bg-clip-text rainbow-gradient animate-rainbow-pan">NYANCAT</span>
        </div>
        
        <div className="hidden md:flex gap-8 items-center font-medium text-sm text-gray-300">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-neon transition-colors duration-200">
              {link}
            </a>
          ))}
          <a href="#buy" className="bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-neon hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] transition-all duration-300 border-2 border-transparent hover:border-neon">
            Fly With Us
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark-surface border-b border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-white hover:text-nyan-pink">
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
  const contractAddress = "[CONTRACT_ADDRESS_PLACEHOLDER]";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <Starfield />
      
      {/* Glow behind center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/10 blur-[150px] rounded-full -z-10" />

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 border border-nyan-pink/50 bg-nyan-pink/10 text-nyan-pink px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
              <Orbit size={16} /> Loop Forever. Fly Forever.
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black leading-tight mb-6">
              ARTIFICIAL <br/>
              <span className="text-transparent bg-clip-text rainbow-gradient animate-rainbow-pan drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                NYANCAT
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
              The classic Pop-Tart Cat upgraded with glowing green AI eyes and an endless rainbow drive. Dogs had their run. Frogs had theirs. The sky belongs to $NYANCAT.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-neon transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] flex items-center justify-center gap-2 group">
                Buy $NYANCAT <Rocket className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={20}/>
              </button>
              <a href="https://x.com/nyancatai" target="_blank" rel="noreferrer" className="border border-white/20 bg-white/5 hover:bg-nyan-pink hover:text-black hover:border-nyan-pink px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm group">
                <XLogo size={20} /> Join the Raid
              </a>
            </motion.div>

            {/* Contract Address Copy */}
            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-2 bg-dark-surface border border-white/10 p-2 rounded-lg max-w-md mx-auto lg:mx-0">
              <span className="text-gray-400 font-mono text-xs sm:text-sm truncate px-2">{contractAddress}</span>
              <button onClick={copyToClipboard} className="bg-white/10 hover:bg-neon hover:text-black p-2 rounded text-white transition-colors">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Nyancat Graphic */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md aspect-square z-10 flex items-center justify-center"
        >
          {/* Animated Rainbow Trail */}
          <div className="absolute top-1/2 -left-[50%] w-[100%] h-1/4 -translate-y-1/2 rainbow-gradient animate-rainbow-pan -z-10 opacity-80 blur-[2px]" />
          
          <motion.div 
            className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-nyan-pink/20 shadow-[0_0_50px_rgba(255,102,204,0.3)] bg-[#9dfb70] animate-float"
          >
            {/* Make sure your uploaded image is saved as public/nyancat.jpg */}
            <Image src="/nyancat.jpg" alt="Artificial Nyancat" fill className="object-contain scale-110" priority />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-dark-surface border border-nyan-pink/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon/10 blur-[80px] rounded-full" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase">The <span className="text-transparent bg-clip-text rainbow-gradient animate-rainbow-pan">Endless</span> Drive</h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed font-medium">
                We took the internet's oldest, most resilient meme and stripped out the biological limitations. Artificial Nyancat patches grey spots on the internet with pure, unadulterated joy.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                Equipped with green laser AI eyes and infinite rainbow thrust, this isn't just a nostalgic throwback. It's a high-frequency, timeline-raiding machine built for the modern Web3 era.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              {[
                { icon: <Rocket className="text-nyan-pink mb-2" size={32}/>, title: "Infinite Thrust", desc: "No gravity, just green candles." },
                { icon: <Shield className="text-neon mb-2" size={32}/>, title: "AI Secured", desc: "Contract renounced, LP burned." },
                { icon: <Zap className="text-nyan-pink mb-2" size={32}/>, title: "Zero Taxes", desc: "0/0 mechanics. Pure speed." },
                { icon: <XLogo className="text-neon mb-2" size={32}/>, title: "X Dominance", desc: "Programmed to raid timelines." }
              ].map((feature, idx) => (
                <div key={idx} className="bg-black/50 border border-white/5 p-6 rounded-2xl hover:border-neon/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] transition-all">
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
  return (
    <section id="tokenomics" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">Token<span className="text-neon">omics</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Straightforward pixel-perfect mechanics. No BS, just infinite flying.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Total Supply", value: "1B", label: "Pop-tarts baked" },
            { title: "Buy/Sell Tax", value: "1%", label: "Zero friction" },
            { title: "Liquidity", value: "Burned", label: "Forever locked" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="bg-dark-surface border border-white/10 p-8 rounded-3xl text-center group hover:-translate-y-2 hover:border-nyan-pink transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-nyan-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-gray-400 font-semibold mb-2">{stat.title}</h3>
              <div className="text-5xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:text-transparent group-hover:bg-clip-text group-hover:rainbow-gradient group-hover:animate-rainbow-pan transition-all">
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
    { phase: "Phase 1: Boot Sequence", items: ["Website Launch & Socials", "Contract Deployment", "Initial AI X Raids", "DEX Listings"] },
    { phase: "Phase 2: Rainbow Overdrive", items: ["CG & CMC Fast-Track", "Trending on Web3 Platforms", "Community Meme Generation", "10k+ Holders Target"] },
    { phase: "Phase 3: Infinite Loop", items: ["Tier-1 CEX Listings", "Mainstream Media Infiltration", "Total Timeline Domination", "The Ultimate Green Candle"] }
  ];

  return (
    <section id="roadmap" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-4xl md:text-6xl font-black text-center mb-16 uppercase">
          Mission <span className="text-transparent bg-clip-text rainbow-gradient animate-rainbow-pan">Log</span>
        </motion.h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:rainbow-gradient before:animate-rainbow-pan rounded-full">
          {phases.map((phase, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
            >
              {/* Timeline Node */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-dark bg-neon text-black shadow-[0_0_15px_rgba(57,255,20,0.8)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Rocket size={16} fill="currentColor" />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-dark-surface border border-white/10 p-6 rounded-2xl shadow-xl hover:border-nyan-pink transition-colors">
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
      <div className="absolute top-0 w-full h-1 rainbow-gradient animate-rainbow-pan" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
          <div>
            <div className="text-3xl font-black tracking-tighter flex items-center gap-2 mb-4">
              <span className="text-white">AI</span>
              <span className="text-transparent bg-clip-text rainbow-gradient animate-rainbow-pan">NYANCAT</span>
            </div>
            <p className="text-gray-500 max-w-sm font-medium">
              Loop forever. Fly forever. The sky belongs to $NYANCAT.
            </p>
          </div>
          <div className="flex gap-4 md:justify-end">
            <a href="https://x.com/nyancatai" className="bg-dark-surface border border-white/10 p-3 rounded-xl hover:bg-nyan-pink hover:text-black hover:border-nyan-pink transition-all">
              <XLogo size={24} />
            </a>
            <a href="https://t.me/ArtificialNyancat" className="bg-dark-surface border border-white/10 p-3 rounded-xl hover:bg-neon hover:text-black hover:border-neon transition-all">
              <Send size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Artificial Nyancat. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            Disclaimer: $NYANCAT is a meme coin with no intrinsic value or expectation of financial return. Just an AI cat flying through space on a pop-tart. For entertainment purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="bg-dark min-h-screen text-white font-sans">
      <Navbar />
      <Hero />
      <About />
      <Tokenomics />
      <Roadmap />
      <Footer />
    </main>
  );
}