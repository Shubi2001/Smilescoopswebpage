import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-cream">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
      
      <div className="section-padding grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
            <Star className="text-brand-yellow fill-brand-yellow" size={16} />
            <span className="text-sm font-bold uppercase tracking-wider">New Launch: Blueberry Cheesecake</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-6">
            NEWLY <br />
            <span className="text-brand-green">LAUNCHED</span> <br />
            <span className="text-brand-pink italic font-serif">Milkshakes</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            Experience the magic of our artisanal milkshakes, crafted with real fruit and pure cream. No artificial flavours, just pure joy in every sip.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary flex items-center gap-2 group">
              Order Online <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 border-2 border-brand-brown rounded-full font-bold hover:bg-brand-brown hover:text-white transition-all">
              Explore Flavours
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                  <img 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="User" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-sm">50k+ Happy Scoopers</p>
              <div className="flex text-brand-yellow">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative z-10 w-full aspect-square max-w-lg mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&h=800&q=80" 
              alt="Milkshake" 
              className="w-full h-full object-contain drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-0 bg-white p-4 rounded-2xl shadow-xl z-20 hidden sm:block"
          >
            <p className="text-xs font-bold text-gray-400 uppercase">Artisanal</p>
            <p className="text-xl font-black">100% NATURAL</p>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 left-0 bg-brand-green text-white p-4 rounded-2xl shadow-xl z-20 hidden sm:block"
          >
            <p className="text-xs font-bold opacity-80 uppercase">Freshly Made</p>
            <p className="text-xl font-black">DAILY BATCH</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
