"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Copy, Check, Target, Heart, Shield, Crosshair, ChevronRight, Menu, X, Coins, TreePine } from 'lucide-react';
import Image from 'next/image';

// --- CUSTOM ICONS ---
const XLogo = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// --- ANIMATION VARIANTS (With 'as const' to fix TS errors) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// --- COMPONENTS ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ["Lore", "Tokenomics", "Chronicles", "Join"];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-sherwood-dark/90 backdrop-blur-md border-b border-gold/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <TreePine className="text-gold" size={28} />
          <span className="text-white">ROB<span className="text-gold">x</span>RUB</span>
        </div>
        
        <div className="hidden md:flex gap-8 items-center font-medium text-sm text-gray-300">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-gold transition-colors duration-200 uppercase tracking-wider">
              {link}
            </a>
          ))}
          <a href="#buy" className="bg-gold text-sherwood-dark px-6 py-2.5 rounded-full font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(241,196,15,0.4)] transition-all duration-300">
            Get $RUB
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
            className="absolute top-full left-0 w-full bg-sherwood-dark border-b border-gold/20 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-white hover:text-gold uppercase tracking-wider">
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
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Graphic Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sherwood/30 blur-[150px] rounded-full -z-10 animate-pulse-glow" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 blur-[120px] rounded-full -z-10" />

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm uppercase tracking-widest">
              <Target size={16} /> The Sherwood Spirit
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black leading-tight mb-6">
              MEET <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">RUB.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Bill is on Solana. Ben is on BNB. Robinhood needs its own guy—that's ROB. And this is RUB, his counterpart. The girl with the ponytail and the green hat. <br/><br/>
              Robin trades memes on Robinhood, stays on Robinhood, uses USDG. Be like Robin.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="bg-gold text-sherwood-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all hover:shadow-[0_0_30px_rgba(241,196,15,0.4)] flex items-center justify-center gap-2 group">
                Trade on Robinhood <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20}/>
              </button>
              <a href="https://x.com/placeholder" target="_blank" rel="noreferrer" className="glass-panel hover:bg-gold/10 hover:text-gold px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group">
                <XLogo size={20} /> Enter Sherwood
              </a>
            </motion.div>

            {/* Contract Address Copy */}
            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-2 glass-panel p-2 rounded-lg max-w-md mx-auto lg:mx-0">
              <span className="text-gray-400 font-mono text-xs sm:text-sm truncate px-2">{contractAddress}</span>
              <button onClick={copyToClipboard} className="bg-gold/10 hover:bg-gold hover:text-sherwood-dark p-2 rounded text-gold transition-colors">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" as const }}
          className="relative mx-auto w-full max-w-md aspect-square z-10 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-sherwood to-gold rounded-3xl opacity-20 blur-xl animate-pulse-glow" />
          <motion.div 
            className="relative w-full h-full rounded-3xl overflow-hidden border border-gold/30 shadow-[0_0_40px_rgba(241,196,15,0.15)] bg-[#95e478] animate-float-slow"
          >
            {/* Make sure your uploaded image is saved as public/rub.jpg */}
            <Image src="/rub.jpg" alt="RUB - The Girl in the Green Hat" fill className="object-cover" priority />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Lore = () => {
  return (
    <section id="lore" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] rounded-full" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">The <span className="text-gold">Counterpart</span></h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed font-medium">
                ROB is the boy in the green hat. RUB is the girl with the ponytail. They share the same hat, the same bow, and the exact same Sherwood spirit.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed font-medium">
                While other chains have their mascots, Robinhood belongs to ROB and RUB. They don't bridge. They don't leave. They trade in USDG and shoot arrows at red candles.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              {[
                { icon: <Target className="text-gold mb-2" size={32}/>, title: "Robinhood Native", desc: "Built for the RH ecosystem." },
                { icon: <Coins className="text-gold mb-2" size={32}/>, title: "USDG Pairings", desc: "Trading in the Sherwood standard." },
                { icon: <Heart className="text-gold mb-2" size={32}/>, title: "ROB x RUB", desc: "The ultimate power couple." },
                { icon: <Shield className="text-gold mb-2" size={32}/>, title: "Unruggable", desc: "For the people, by the people." }
              ].map((feature, idx) => (
                <div key={idx} className="bg-sherwood-dark/50 border border-gold/10 p-6 rounded-2xl hover:border-gold/40 hover:bg-sherwood-dark transition-all group">
                  <div className="group-hover:scale-110 transition-transform duration-300 origin-left">{feature.icon}</div>
                  <h3 className="text-white font-bold mb-1 mt-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
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
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight">Token<span className="text-gold">omics</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Straight from the King's treasury directly to the people. No taxes. No limits.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Total Supply", value: "[TBA]", label: "Arrows in the quiver" },
            { title: "Buy/Sell Tax", value: "0%", label: "Steal from the rich" },
            { title: "Liquidity", value: "Locked", label: "Secured in Sherwood" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="glass-panel p-8 rounded-3xl text-center group hover:-translate-y-2 hover:border-gold/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-gray-300 font-semibold mb-2 uppercase tracking-wider text-sm">{stat.title}</h3>
              <div className="text-5xl font-black text-white mb-2 group-hover:text-gold transition-colors">
                {stat.value}
              </div>
              <p className="text-sm text-gold/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Roadmap = () => {
  const phases = [
    { phase: "Act I: Enter Sherwood", items: ["Website Launch", "Token Deployment", "Social Expansion", "ROB x RUB Lore established"] },
    { phase: "Act II: The Merry Men", items: ["Community Growth", "DEX Listings", "Robinhood Native Marketing", "USDG Pairing Partnerships"] },
    { phase: "Act III: Taking the Crown", items: ["Major CEX Listings", "Flipping Solana/BNB Mascots", "Total Ecosystem Domination", "The Golden Arrow"] }
  ];

  return (
    <section id="chronicles" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-4xl md:text-6xl font-black text-center mb-16 uppercase tracking-tight">
          The <span className="text-gold">Chronicles</span>
        </motion.h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gold before:to-transparent">
          {phases.map((phase, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
            >
              {/* Timeline Node */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-sherwood-dark bg-gold text-sherwood-dark shadow-[0_0_15px_rgba(241,196,15,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Crosshair size={16} fill="currentColor" />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-2xl shadow-xl hover:border-gold/50 transition-colors">
                <h3 className="text-xl font-bold text-white mb-4">{phase.phase}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <ChevronRight size={18} className="text-gold shrink-0 mt-0.5" />
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
    <footer className="border-t border-gold/10 bg-sherwood-dark pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
          <div>
            <div className="text-3xl font-black tracking-tighter flex items-center gap-2 mb-4">
              <TreePine className="text-gold" size={32} />
              <span className="text-white">ROB<span className="text-gold">x</span>RUB</span>
            </div>
            <p className="text-gray-400 max-w-sm font-medium">
              The girl in the green hat. Built for the Robinhood Chain.
            </p>
          </div>
          <div className="flex gap-4 md:justify-end">
            <a href="#" className="glass-panel p-3 rounded-xl hover:bg-gold hover:text-sherwood-dark hover:border-gold transition-all">
              <XLogo size={24} />
            </a>
            <a href="#" className="glass-panel p-3 rounded-xl hover:bg-gold hover:text-sherwood-dark hover:border-gold transition-all">
              <Target size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} RUB. All rights reserved in Sherwood.</p>
          <p className="max-w-xl text-center md:text-right">
            Disclaimer: $RUB is a meme coin with no intrinsic value or expectation of financial return. For entertainment purposes only. Be like Robin.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar />
      <Hero />
      <Lore />
      <Tokenomics />
      <Roadmap />
      <Footer />
    </main>
  );
}