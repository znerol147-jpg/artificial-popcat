"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// --- CUSTOM X ICON ---
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

const Marquee = () => (
  <div className="w-full bg-black text-white font-black text-xl py-3 overflow-hidden whitespace-nowrap border-y-4 border-black flex items-center z-50 relative">
    <div className="flex animate-marquee min-w-max">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-4">
          ROB x RUB 🏹 ROBINHOOD CHAIN 🏹 USDG 🏹 STAY ON ROBINHOOD 🏹 
        </span>
      ))}
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Lore", "Tokenomics", "Chronicles"];

  return (
    <>
      <Marquee />
      <nav className="w-full bg-rub-green border-b-4 border-black py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-3xl font-black tracking-tighter brutal-text-shadow">
            $RUB
          </div>
          
          <div className="hidden md:flex gap-8 items-center font-black text-lg">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:underline decoration-4 underline-offset-4">
                {link}
              </a>
            ))}
            <a href="#buy" className="bg-white text-black px-6 py-2 font-black brutal-box rounded-xl">
              BUY $RUB
            </a>
          </div>

          <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} strokeWidth={3} /> : <Menu size={32} strokeWidth={3} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0 }} 
              animate={{ height: 'auto' }} 
              exit={{ height: 0 }}
              className="absolute top-full left-0 w-full bg-white border-b-4 border-black flex flex-col md:hidden overflow-hidden"
            >
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-2xl font-black p-6 border-b-4 border-black last:border-b-0 hover:bg-rub-green">
                  {link}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "[CONTRACT_ADDRESS_HERE]";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* The Art */}
        <motion.div 
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: -2 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative mx-auto w-full max-w-md aspect-square lg:order-2"
        >
          <div className="w-full h-full brutal-box bg-white p-4 rounded-2xl rotate-3 animate-bounce-slow">
            <div className="relative w-full h-full border-4 border-black overflow-hidden rounded-xl">
              <Image src="/rub.jpg" alt="RUB" fill className="object-cover" priority />
            </div>
            <p className="text-center font-black text-2xl mt-4 tracking-widest">RUB</p>
          </div>
        </motion.div>

        {/* The Text */}
        <div className="text-center lg:text-left z-10 lg:order-1">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black mb-6 brutal-text-shadow leading-none"
          >
            ROB x RUB
          </motion.h1>
          
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white brutal-box p-6 rounded-2xl mb-8">
            <p className="text-xl md:text-2xl font-bold leading-snug">
              Bill is on Solana. Ben is on BNB. <br/>
              Robinhood needs its own guy, that's ROB. <br/><br/>
              And this is <span className="bg-rub-green px-2 border-2 border-black">RUB</span>, the girl in the green hat.
            </p>
          </motion.div>
          
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8">
            <button className="bg-white text-black px-8 py-4 rounded-xl font-black text-xl brutal-box flex items-center justify-center gap-2">
              Trade RH <ArrowRight strokeWidth={4} />
            </button>
            <a href="https://x.com/placeholder" target="_blank" rel="noreferrer" className="bg-black text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl font-black text-xl brutal-box flex items-center justify-center gap-2">
              <XLogo size={24} /> Raid X
            </a>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-between gap-2 bg-white brutal-box p-3 rounded-xl max-w-md mx-auto lg:mx-0">
            <span className="font-mono font-bold text-sm sm:text-base truncate">{contractAddress}</span>
            <button onClick={copyToClipboard} className="bg-rub-green border-2 border-black p-2 rounded hover:bg-black hover:text-white transition-colors">
              {copied ? <Check size={20} strokeWidth={3} /> : <Copy size={20} strokeWidth={3} />}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Lore = () => {
  return (
    <section id="lore" className="py-24 bg-white border-y-4 border-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-black mb-12 text-center brutal-text-shadow">THE LORE</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-rub-green brutal-box p-8 rounded-3xl">
            <h3 className="text-3xl font-black mb-4">SAME HAT. SAME SPIRIT. 🎩</h3>
            <p className="text-xl font-bold leading-relaxed">
              ROB is the boy in the green hat. RUB is the girl with the ponytail. They don't bridge to other chains. They stay on Robinhood. They trade memes. They use USDG.
            </p>
          </div>
          <div className="bg-black text-white brutal-box p-8 rounded-3xl">
            <h3 className="text-3xl font-black mb-4">BE LIKE ROB & RUB 💸</h3>
            <p className="text-xl font-bold leading-relaxed">
              Why leave the app? Robinhood is where the volume is. We are the face of the RH chain. Steal from the red candles, give to the green candles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Tokenomics = () => {
  return (
    <section id="tokenomics" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-12 brutal-text-shadow">TOKENOMICS</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "TAX", value: "1%" },
            { title: "LIQUIDITY", value: "BURNED" },
            { title: "SUPPLY", value: "1 BILLION" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
              className="bg-white brutal-box p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-black mb-2">{stat.title}</h3>
              <div className="text-5xl font-black bg-rub-green inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {stat.value}
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
    <footer className="bg-black text-white py-12 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-black mb-6">$RUB ON ROBINHOOD</h2>
        <p className="font-bold text-lg mb-8 max-w-2xl mx-auto">
          Disclaimer: $RUB is a meme coin. It's a drawing of a girl in a hat. It has no intrinsic value. Have fun, stay on Robinhood, and don't take it too seriously.
        </p>
        <div className="flex justify-center gap-6">
          <a href="https://x.com/rub_rbh" target="_blank" rel="noreferrer" className="bg-white text-black p-4 rounded-full border-4 border-black hover:bg-rub-green hover:-translate-y-1 transition-all">
            <XLogo size={32} />
          </a>
          <a href="https://t.me/+9CRTKI5EaEdkYmQ1" target="_blank" rel="noreferrer" className="bg-white text-black p-4 rounded-full border-4 border-black hover:bg-rub-green hover:-translate-y-1 transition-all">
            <TelegramLogo size={32} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Lore />
      <Tokenomics />
      <Footer />
    </main>
  );
}