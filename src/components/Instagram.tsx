import { motion } from 'motion/react';
import { Instagram as InstagramIcon } from 'lucide-react';

export default function Instagram() {
  return (
    <section className="py-24 bg-white">
      <div className="section-padding">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-pink mb-4">
            <InstagramIcon size={24} />
            <span className="font-bold tracking-widest uppercase">@apsaraicecreams</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black">
            Instagram <span className="text-brand-green italic font-serif">Captures</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 6) * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer relative group"
            >
              <img 
                src={`https://picsum.photos/seed/icecream${i}/400/400`} 
                alt="Instagram post" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-pink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <InstagramIcon className="text-white" size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
