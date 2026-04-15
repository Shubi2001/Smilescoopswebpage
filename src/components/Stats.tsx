import { motion } from 'motion/react';
import { MapPin, IceCream, Store } from 'lucide-react';

const stats = [
  { label: 'CITIES', value: '25+', icon: MapPin },
  { label: 'FLAVOURS', value: '50+', icon: IceCream },
  { label: 'OUTLETS', value: '120+', icon: Store },
];

export default function Stats() {
  return (
    <section className="py-24 bg-white">
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://picsum.photos/seed/map/800/800" 
              alt="Growth Map" 
              className="w-full h-auto rounded-3xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-green/5 rounded-3xl" />
          </motion.div>

          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Growth <span className="text-brand-green">&</span> Presence
            </h2>
            <p className="text-gray-600 mb-12 text-lg">
              What started as a local store in Walkeshwar, Mumbai to over 125+ outlets nationwide, Apsara Ice Creams has become a beloved brand that brings joy in every scoop. Our customers' delight is our fuel to spreading smiles across India.
            </p>

            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-green">
                    <stat.icon size={32} />
                  </div>
                  <div className="text-3xl font-black text-brand-brown">{stat.value}</div>
                  <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <button className="btn-primary mt-12">FIND STORE</button>
          </div>
        </div>
      </div>
    </section>
  );
}
