import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, CreditCard, Wallet, CheckCircle2, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { cn } from '@/src/lib/utils';

// Initialize Stripe
const stripePromise = loadStripe((import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

function StripeCheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'An error occurred');
      setProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      <button
        disabled={!stripe || processing}
        className="w-full btn-primary bg-brand-brown hover:bg-black py-4 flex items-center justify-center gap-2"
      >
        {processing ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
        {processing ? 'Processing...' : 'Pay with Stripe'}
      </button>
    </form>
  );
}

export default function CheckoutModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (paymentMethod === 'stripe' && !clientSecret) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 2500 }), // $25.00
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [paymentMethod, clientSecret]);

  const cartItems = [
    { name: 'Guava Glory (500ml)', price: 12.50, qty: 1 },
    { name: 'Belgian Bite (500ml)', price: 12.50, qty: 1 },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40 bg-brand-brown text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <ShoppingBag size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
          Checkout ($25.00)
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                {step === 'cart' && (
                  <div>
                    <h2 className="text-3xl font-black mb-6">Your <span className="text-brand-brown">Scoops</span></h2>
                    <div className="space-y-4 mb-8">
                      {cartItems.map((item) => (
                        <div key={item.name} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                          <div>
                            <p className="font-bold">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                          </div>
                          <p className="font-black">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                      <div className="flex justify-between items-center p-4 border-t-2 border-dashed border-gray-200 mt-4">
                        <p className="text-xl font-black">Total</p>
                        <p className="text-2xl font-black text-brand-green">${total.toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setStep('payment')}
                      className="w-full btn-primary bg-brand-green py-4 text-lg"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                )}

                {step === 'payment' && (
                  <div>
                    <h2 className="text-3xl font-black mb-6">Choose <span className="text-brand-brown">Payment</span></h2>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <button
                        onClick={() => setPaymentMethod('stripe')}
                        className={cn(
                          "p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3",
                          paymentMethod === 'stripe' ? "border-brand-brown bg-brand-brown/5" : "border-gray-100 hover:border-gray-200"
                        )}
                      >
                        <CreditCard size={32} className={paymentMethod === 'stripe' ? "text-brand-brown" : "text-gray-400"} />
                        <span className="font-bold">Stripe</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('paypal')}
                        className={cn(
                          "p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3",
                          paymentMethod === 'paypal' ? "border-blue-600 bg-blue-50" : "border-gray-100 hover:border-gray-200"
                        )}
                      >
                        <Wallet size={32} className={paymentMethod === 'paypal' ? "text-blue-600" : "text-gray-400"} />
                        <span className="font-bold">PayPal</span>
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {paymentMethod === 'stripe' && clientSecret && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <StripeCheckoutForm onSuccess={() => setStep('success')} />
                          </Elements>
                        </motion.div>
                      )}

                      {paymentMethod === 'paypal' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <PayPalScriptProvider options={{ "clientId": (import.meta as any).env.VITE_PAYPAL_CLIENT_ID || "test" }}>
                            <PayPalButtons
                              style={{ layout: "vertical", shape: "pill" }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  intent: "CAPTURE",
                                  purchase_units: [{
                                    amount: {
                                      currency_code: "USD",
                                      value: total.toString(),
                                    },
                                  }],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                if (actions.order) {
                                  await actions.order.capture();
                                  setStep('success');
                                }
                              }}
                            />
                          </PayPalScriptProvider>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => setStep('cart')}
                      className="w-full mt-6 text-gray-400 font-bold hover:text-brand-brown transition-colors"
                    >
                      Back to Cart
                    </button>
                  </div>
                )}

                {step === 'success' && (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-green/20"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <h2 className="text-4xl font-black mb-4">Sweet Success!</h2>
                    <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                      Your payment was successful. We're starting to scoop your order right now!
                    </p>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setStep('cart');
                        setPaymentMethod(null);
                      }}
                      className="btn-primary bg-brand-green px-12"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
