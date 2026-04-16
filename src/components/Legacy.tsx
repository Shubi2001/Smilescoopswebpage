import { motion } from 'motion/react';
import { History, MapPin, Factory, Award } from 'lucide-react';

const milestones = [
  {
    year: '1971',
    title: 'The Beginning',
    description: 'A humble outlet in Walkeshwar serving fresh SANCHA ice creams.',
    icon: History,
  },
  {
    year: '2005',
    title: 'Innovation',
    description: 'Created a sugar free range for diabetic & health conscious lovers.',
    icon: Award,
  },
  {
    year: '2018',
    title: 'Expansion',
    description: 'State of the art manufacturing facility & 50+ outlets.',
    icon: Factory,
  },
  {
    year: '2024',
    title: 'New Horizons',
    description: 'Launched a new category of popsicles in 5 exciting flavours.',
    icon: MapPin,
  },
];

export default function Legacy() {
  return (
    <section id="story" className="py-24 bg-brand-cream/20">
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Our <span className="text-brand-green italic font-serif">Legacy</span>
            </h2>
            <p className="text-gray-600 mb-12 text-lg leading-relaxed">
              Founded in 1971 in Mumbai, Apsara Ice Cream started as a small-scale business and has grown into a recognized premium ice cream brand. Our journey is defined by a commitment to quality and a passion for creating unique, natural flavours.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {milestones.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <item.icon size={20} />
                    </div>
                    <span className="text-2xl font-black text-brand-green">{item.year}</span>
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516559828984-fb3b923ca2d4?auto=format&fit=crop&w=1200&h=800&q=80" 
                alt="World's Top Ice Cream" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <h3 className="text-white text-3xl font-black">WORLD'S TOP <br /> ICE CREAM FLAVOUR</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
