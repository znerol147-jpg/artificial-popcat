"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Menu, X, ArrowUpRight, Leaf, Shield, LineChart, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// --- CUSTOM ICONS ---
const XLogo = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TelegramLogo = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
  </svg>
);

// --- COMPONENTS ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Lore", "Memes", "Tokenomics"];

  return (
    <nav className="fixed w-full z-50 top-0 pt-6 px-6 mix-blend-difference">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3">
        <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Leaf className="text-[#6EE751]" size={20} /> $KERMIT
        </div>
        
        <div className="hidden md:flex gap-8 items-center font-medium text-sm text-gray-300">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">
              {link}
            </a>
          ))}
          <a href="#buy" className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition-transform">
            Buy Now
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-24 left-6 right-6 bg-[#0A1C10]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a key={link} href={`https://t.me/KermitcoinRH${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-white hover:text-[#6EE751]">
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
  const [copied, setCopied] = useState(false);
  const contractAddress = "[CONTRACT_ADDRESS_PLACEHOLDER]";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 overflow-hidden">
      
      {/* Floating 2D Coin */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] z-20 relative mb-[-40px]"
      >
        <div className="absolute inset-0 bg-[#6EE751]/30 blur-[60px] rounded-full scale-75 animate-pulse" />
        <Image 
          src="/kermit.png" 
          alt="Kermitcoin" 
          fill 
          className="object-contain drop-shadow-[0_10px_30px_rgba(110,231,81,0.3)] z-10" 
          priority 
        />
      </motion.div>

      {/* Text Card Content */}
      <div className="z-10 text-center px-6 w-full max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} 
          className="glass-card rounded-3xl p-8 md:p-12 pt-16 md:pt-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
            Same Frog. <span className="text-[#6EE751]">Bigger Gains.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            Robinhood's true mascot has arrived. $KERMIT brings the Sherwood spirit to the blockchain. A community that believes. 
          </p>
          
          <div className="flex justify-center mb-8">
            <button className="bg-[#6EE751] text-[#0A1C10] px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(110,231,81,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              Trade $KERMIT <ArrowUpRight size={20} />
            </button>
          </div>

          <div className="inline-flex items-center justify-center gap-3 bg-black/40 border border-white/10 p-2 pl-4 rounded-full max-w-full">
            <span className="font-mono text-sm text-gray-400 truncate">{contractAddress}</span>
            <button onClick={copyToClipboard} className="bg-white/10 hover:bg-[#6EE751] hover:text-black p-2 rounded-full text-white transition-colors shrink-0">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Lore = () => {
  return (
    <section id="lore" className="py-24 max-w-5xl mx-auto px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 md:p-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6EE751]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6EE751]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 text-white">
          The Legend of <span className="text-[#6EE751]">Kermitcoin</span>
        </h2>
        
        <div className="space-y-6 text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-3xl">
          <p>
            Long before memes ruled crypto, there was one frog who lived deep in the Green Forest. While whales hoarded wealth and insiders controlled the market, Kermit picked up a bow and became the Robin Hood of crypto.
          </p>
          
          <div className="py-4 my-8">
            <p className="text-2xl md:text-3xl font-medium text-white border-l-4 border-[#6EE751] pl-6 italic">
              He doesn't steal gold—<span className="text-[#6EE751] not-italic">he steals green candles.</span>
            </p>
          </div>
          
          <p>
            Every arrow Kermit fires breaks another whale's control and sends liquidity back to the community. His army isn't made of kings or VCs. It's made of frogs who believe everyone deserves a chance at the moon.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const MemeGallery = () => {
  const [index, setIndex] = useState(0);
  
  const memes = [
    "/kermitmeme_1.png", "/kermitmeme_2.png", "/kermitmeme_3.png",
    "/kermitmeme_4.png", "/kermitmeme_5.png", "/kermitmeme_6.png",
    "/kermitmeme_7.png", "/kermitmeme_8.png", "/kermitmeme_9.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % memes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [index, memes.length]);

  const handleNext = () => setIndex((prev) => (prev + 1) % memes.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + memes.length) % memes.length);

  const getVariant = (i: number, activeIndex: number, total: number) => {
    if (i === activeIndex) return "center";
    if (i === (activeIndex - 1 + total) % total) return "left";
    if (i === (activeIndex + 1) % total) return "right";
    const diff = (i - activeIndex + total) % total;
    if (diff < total / 2) return "hiddenRight";
    return "hiddenLeft";
  };

  const variants = {
    center: { x: "0%", scale: 1, zIndex: 10, opacity: 1, filter: "blur(0px)" },
    left: { x: "-60%", scale: 0.8, zIndex: 5, opacity: 0.6, filter: "blur(4px)" },
    right: { x: "60%", scale: 0.8, zIndex: 5, opacity: 0.6, filter: "blur(4px)" },
    hiddenLeft: { x: "-100%", scale: 0.5, zIndex: 0, opacity: 0, filter: "blur(10px)" },
    hiddenRight: { x: "100%", scale: 0.5, zIndex: 0, opacity: 0, filter: "blur(10px)" }
  };

  return (
    <section id="memes" className="py-24 relative z-10 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">The <span className="text-[#6EE751]">Culture</span></h2>
        <p className="text-gray-400 text-lg">9 reasons why Kermit runs Sherwood.</p>
      </div>

      <div className="relative h-[300px] md:h-[500px] w-full flex items-center justify-center">
        {memes.map((meme, i) => (
          <motion.div
            key={i}
            className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden glass-card border-2 border-white/10 shadow-2xl"
            variants={variants}
            initial="hiddenRight"
            animate={getVariant(i, index, memes.length)}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <Image 
              src={meme} 
              alt={`Kermit Meme ${i + 1}`} 
              fill 
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button 
          onClick={handlePrev} 
          className="p-4 rounded-full glass-card hover:bg-[#6EE751] hover:text-black transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {memes.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-[#6EE751] scale-125' : 'bg-white/20 hover:bg-white/50'}`}
            />
          ))}
        </div>
        <button 
          onClick={handleNext} 
          className="p-4 rounded-full glass-card hover:bg-[#6EE751] hover:text-black transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

const TokenomicsBento = () => {
  return (
    <section id="tokenomics" className="py-24 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-center">Protocol <span className="text-[#6EE751]">Metrics</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between min-h-[300px]">
          <div>
            <Leaf className="text-[#6EE751] mb-4" size={40} />
            <h3 className="text-3xl font-bold mb-2">Optimized Tax Structure.</h3>
            <p className="text-gray-400 text-lg max-w-md">Kermitcoin is built for sustainable growth and community rewards across the Robinhood ecosystem.</p>
          </div>
          <div className="mt-8 text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE751] to-white">
            1%
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between min-h-[300px]">
          <Shield className="text-[#6EE751] mb-4" size={32} />
          <div>
            <p className="text-gray-400 mb-1">Liquidity</p>
            <h3 className="text-3xl font-bold">Burned</h3>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between min-h-[300px]">
          <Globe className="text-[#6EE751] mb-4" size={32} />
          <div>
            <p className="text-gray-400 mb-1">Total Supply</p>
            <h3 className="text-3xl font-bold">1B</h3>
          </div>
        </div>

        <div className="md:col-span-2 glass-card glass-card-hover rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <LineChart className="text-[#6EE751] mb-4" size={32} />
            <h3 className="text-2xl font-bold mb-2">Contract Renounced</h3>
            <p className="text-gray-400">The contract ownership has been renounced, ensuring no one can alter the core mechanics. It belongs to the community now.</p>
          </div>
          <div className="bg-[#6EE751]/10 text-[#6EE751] px-6 py-3 rounded-full font-mono font-bold whitespace-nowrap">
            SECURE VERIFIED
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 mt-24 py-12 relative z-10 bg-black/20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Leaf className="text-[#6EE751]" size={24} /> $KERMIT
        </div>
        
        <p className="text-gray-500 text-sm text-center md:text-left max-w-lg">
          Disclaimer: $KERMIT is a meme coin with no intrinsic value or expectation of financial return. For entertainment purposes only. Stay green.
        </p>
        
        <div className="flex gap-4">
          <a href="https://x.com/KermitcoinRH" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-[#6EE751] hover:text-black transition-colors border border-white/10">
            <XLogo size={20} />
          </a>
          <a href="https://t.me/KermitcoinRH" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-[#6EE751] hover:text-black transition-colors border border-white/10">
            <TelegramLogo size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-[#6EE751] selection:text-black">
      <Navbar />
      <Hero />
      <Lore />
      <MemeGallery />
      <TokenomicsBento />
      <Footer />
    </main>
  );
}