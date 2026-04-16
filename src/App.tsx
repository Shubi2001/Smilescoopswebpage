/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedFlavours from './components/FeaturedFlavours';
import Categories from './components/Categories';
import Ingredients from './components/Ingredients';
import Legacy from './components/Legacy';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Instagram from './components/Instagram';
import Footer from './components/Footer';
import DeliveryTracker from './components/DeliveryTracker';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  return (
    <main className="min-h-screen selection:bg-brand-green selection:text-white">
      <Navbar />
      <Hero />
      <FeaturedFlavours />
      <Categories />
      <Ingredients />
      <Legacy />
      <Stats />
      <Testimonials />
      <Instagram />
      <Footer />
      <DeliveryTracker />
      <CheckoutModal />
    </main>
  );
}
