import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Chetan Deshmukh',
    source: 'Google Review',
    text: 'Tried Guava flavour and Pani puri flavour. Truly Natural than Naturals Ice Cream. At a point you will think is this ice cream or am I eating the real fruit! Apsara ice cream is that genuine! One of the best ice cream I ever had. Truly amazing!',
    rating: 5,
  },
  {
    name: 'Manish Kumar',
    source: 'Google Review',
    text: 'Sugarfree natural ice creams... guava with salt and chilli powder is my favourite. They have some amazing flavours. The texture is so creamy and the taste is just out of this world. Highly recommended for all ice cream lovers!',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-cream/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />
      
      <div className="section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-brand-pink italic font-serif">Sweet</span> Words, Like Melting Icecream
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm relative"
            >
              <Quote className="absolute top-8 right-8 text-brand-green/10" size={64} />
              
              <div className="flex text-brand-yellow mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8 italic">
                "{review.text}"
              </p>
              
              <div>
                <h4 className="font-black text-xl">{review.name}</h4>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{review.source}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
