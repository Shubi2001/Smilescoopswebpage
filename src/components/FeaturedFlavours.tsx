import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const flavours = [
  {
    name: 'Guava Glory',
    description: 'The perfect blend of sweet and tangy pink guava with a pinch of salt and chilli.',
    color: 'bg-pink-500',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Belgian Bite',
    description: 'Rich, dark Belgian chocolate with crunchy bits for the ultimate cocoa experience.',
    color: 'bg-amber-900',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Roasted Almond',
    description: 'Slow-roasted Californian almonds in our signature creamy vanilla base.',
    color: 'bg-orange-600',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Pani Puri Patakha',
    description: 'A daring, spicy and tangy twist on India’s most loved street snack.',
    color: 'bg-green-600',
    image: 'https://images.unsplash.com/photo-1505394033323-4241b2213fd3?auto=format&fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Mango Magic',
    description: 'Made with real Ratnagiri Alphonso mangoes for a true summer delight.',
    color: 'bg-yellow-500',
    image: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Blueberry Bliss',
    description: 'Wild blueberries swirled into a creamy cheesecake base.',
    color: 'bg-indigo-600',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Sitaphal Splendor',
    description: 'Creamy custard apple pulp that melts in your mouth.',
    color: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1560008583-097743cc88ea?auto=format&fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Tender Coconut',
    description: 'Refreshing malai from fresh tender coconuts in every bite.',
    color: 'bg-slate-400',
    image: 'https://images.unsplash.com/photo-1584208124888-3a20b9c799e2?auto=format&fit=crop&w=400&h=400&q=80',
  },
];

export default function FeaturedFlavours() {
  return (
    <section id="flavours" className="py-24 bg-white overflow-hidden">
      <div className="section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="text-brand-green">OGs</span> - Originals Crafted to Perfection
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our signature flavours that have stood the test of time. Each scoop is a masterpiece of taste and texture, made with 100% natural ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {flavours.map((flavour, index) => (
            <motion.div
              key={flavour.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 4) * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative group overflow-hidden aspect-[3/4] flex flex-col items-center justify-center p-8 text-white text-center",
                flavour.color
              )}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative z-10 w-48 h-48 mb-6 drop-shadow-2xl"
              >
                <img 
                  src={flavour.image} 
                  alt={flavour.name} 
                  className="w-full h-full object-contain rounded-full border-8 border-white/20"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              <h3 className="text-3xl font-black mb-2 relative z-10">{flavour.name}</h3>
              <p className="text-sm opacity-90 relative z-10">{flavour.description}</p>
              
              <button className="mt-6 px-6 py-2 bg-white text-brand-brown rounded-full font-bold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 relative z-10">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
