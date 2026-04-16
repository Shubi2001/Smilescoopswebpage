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
          {[
            'photo-1567206563066-05e73fdf3a91', 
            'photo-1576506295286-5cda18df43c7', 
            'photo-1580915411954-282cb1b0d780', 
            'photo-1516559828984-fb3b923ca2d4', 
            'photo-1551024601-bec78aea704b', 
            'photo-1488900128323-21503983a07e',
            'photo-1560008511-11c63416e52d',
            'photo-1563805042-7684c019e1cb',
            'photo-1501443762994-82bd5dace89a',
            'photo-1497034825429-c343d7c6a68f',
            'photo-1551024506-0bccd828d307',
            'photo-1584208124888-3a20b9c799e2'
          ].map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 6) * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer relative group"
            >
              <img 
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&h=400&q=80`} 
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
