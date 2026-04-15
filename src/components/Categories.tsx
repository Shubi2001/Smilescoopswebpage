import { motion } from 'motion/react';

const categories = [
  { name: 'Popsicool', icon: '🍦', color: 'bg-pink-100' },
  { name: 'Fruitylicious', icon: '🍓', color: 'bg-red-100' },
  { name: 'Nuttylicious', icon: '🥜', color: 'bg-amber-100' },
  { name: 'Chocolicious', icon: '🍫', color: 'bg-brown-100' },
  { name: 'Sorbelicious', icon: '🍋', color: 'bg-yellow-100' },
  { name: 'Seasonal', icon: '🥭', color: 'bg-orange-100' },
  { name: 'Kulfi', icon: '🍢', color: 'bg-yellow-50' },
  { name: 'Festive', icon: '✨', color: 'bg-purple-100' },
  { name: 'Sugar Free', icon: '🍃', color: 'bg-green-100' },
  { name: 'Sundaes', icon: '🍨', color: 'bg-blue-100' },
  { name: 'Milkshakes', icon: '🥤', color: 'bg-indigo-100' },
];

export default function Categories() {
  return (
    <section className="py-20 bg-brand-cream/30">
      <div className="section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">
            Flavours <span className="text-brand-pink italic font-serif">Irresistible</span> to Savour
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className={`w-20 h-20 rounded-full ${cat.color} flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300`}>
                {cat.icon}
              </div>
              <span className="text-sm font-bold text-gray-600 group-hover:text-brand-brown transition-colors">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
