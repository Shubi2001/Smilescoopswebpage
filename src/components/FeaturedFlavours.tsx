import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const flavours = [
  {
    name: 'Guava Glory',
    description: 'The perfect blend of sweet and tangy pink guava.',
    color: 'bg-pink-500',
    image: 'https://picsum.photos/seed/guava/400/400',
  },
  {
    name: 'Belgian Bite',
    description: 'Rich, dark Belgian chocolate with crunchy bits.',
    color: 'bg-amber-900',
    image: 'https://picsum.photos/seed/chocolate/400/400',
  },
  {
    name: 'Roasted Almond',
    description: 'Slow-roasted almonds in creamy vanilla base.',
    color: 'bg-orange-600',
    image: 'https://picsum.photos/seed/almond/400/400',
  },
  {
    name: 'Pani Puri Patakha',
    description: 'A daring twist on India’s favourite street snack.',
    color: 'bg-green-600',
    image: 'https://picsum.photos/seed/panipuri/400/400',
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
            Our signature flavours that have stood the test of time. Each scoop is a masterpiece of taste and texture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {flavours.map((flavour, index) => (
            <motion.div
              key={flavour.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
