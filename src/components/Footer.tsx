import { Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-green text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full" />

      <div className="section-padding relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-green font-black text-2xl">
                S
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tighter">
                SCOOPS<span className="text-white/80">&</span>SMILES
              </span>
            </div>
            <p className="text-white/80 mb-8 leading-relaxed">
              Crafting joy since 1971. Our mission is to spread smiles through the magic of natural, handcrafted ice creams.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-green transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-xl mb-8">Quick Links</h4>
            <ul className="space-y-4 text-white/80">
              {['Our Brand Story', 'Media', 'Franchisee', 'Store Locator', 'Muskaan', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xl mb-8">Flavours</h4>
            <ul className="space-y-4 text-white/80">
              {['Fruit Flavours', 'Nutty Flavours', 'Chocolate Flavours', 'Sugar Free', 'Popsicles', 'Sundaes'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xl mb-8">Newsletter</h4>
            <p className="text-white/80 mb-6 italic">Subscribe for sweet updates and exclusive offers!</p>
            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all"
              />
              <button className="px-6 py-3 bg-white text-brand-green rounded-full font-bold hover:bg-brand-cream transition-all">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/60">
          <p>© 2026 Scoops & Smiles Ice Creams. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all group"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
