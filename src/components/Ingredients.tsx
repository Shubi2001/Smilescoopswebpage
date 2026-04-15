import { motion } from 'motion/react';
import { Leaf, Droplets, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  {
    title: 'Premium Handcrafted',
    description: 'Ice creams from Mumbai since 1971, made with love.',
    icon: Sparkles,
    color: 'text-brand-yellow',
  },
  {
    title: 'Real Fruits & Dry Fruits',
    description: 'No artificial flavours, only the goodness of nature.',
    icon: Leaf,
    color: 'text-brand-green',
  },
  {
    title: 'Fresh Buffalo Milk',
    description: 'For that rich, creamy taste and smooth texture.',
    icon: Droplets,
    color: 'text-blue-500',
  },
  {
    title: 'Hygienically Prepared',
    description: 'Contactless packaging and strict quality standards.',
    icon: ShieldCheck,
    color: 'text-brand-pink',
  },
];

export default function Ingredients() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-brand-green rounded-full" />
          ))}
        </div>
      </div>
      
      <div className="section-padding grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://picsum.photos/seed/ingredients/800/800" 
              alt="Ingredients" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-green rounded-3xl -z-10" />
          <div className="absolute -top-6 -left-6 w-48 h-48 bg-brand-pink/20 rounded-full blur-2xl -z-10" />
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
            Ingredient in <span className="text-brand-green">Every</span> <br />
            Delightful Scoop!
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
