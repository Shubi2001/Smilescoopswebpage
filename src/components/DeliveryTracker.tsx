import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, CheckCircle2, Clock, MapPin, Package, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface OrderUpdate {
  orderId: string;
  status: string;
  progress: number;
  message: string;
  timestamp: string;
}

export default function DeliveryTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState<OrderUpdate | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('order_update', (data: OrderUpdate) => {
      setTrackingData(data);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && orderId) {
      socket.emit('track_order', orderId);
      setIsTracking(true);
    }
  };

  const steps = [
    { label: 'Confirmed', icon: CheckCircle2, minProgress: 10 },
    { label: 'Preparing', icon: Package, minProgress: 30 },
    { label: 'On the Way', icon: Truck, minProgress: 60 },
    { label: 'Delivered', icon: MapPin, minProgress: 100 },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-brand-orange text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <Truck size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
          Track Delivery
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                <h2 className="text-3xl font-black mb-2">Track Your <span className="text-brand-orange">Scoops</span></h2>
                <p className="text-gray-500 mb-8">Enter your order ID to see real-time updates.</p>

                {!isTracking ? (
                  <form onSubmit={handleTrack} className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Order ID (e.g. SS-1234)"
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-orange rounded-2xl outline-none transition-all font-bold"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full btn-primary bg-brand-orange hover:bg-brand-orange/90 py-4 text-lg">
                      Track Now
                    </button>
                  </form>
                ) : (
                  <div className="space-y-8">
                    {/* Progress Bar */}
                    <div className="relative pt-8">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${trackingData?.progress || 0}%` }}
                          className="h-full bg-brand-orange"
                        />
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        {steps.map((step) => {
                          const isCompleted = (trackingData?.progress || 0) >= step.minProgress;
                          return (
                            <div key={step.label} className="flex flex-col items-center gap-2">
                              <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                isCompleted ? "bg-brand-orange text-white" : "bg-gray-100 text-gray-400"
                              )}>
                                <step.icon size={18} />
                              </div>
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-wider",
                                isCompleted ? "text-brand-orange" : "text-gray-400"
                              )}>
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Status Card */}
                    <div className="bg-brand-cream p-6 rounded-3xl border border-brand-orange/10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-sm">
                          <Clock size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-orange uppercase tracking-widest">Current Status</p>
                          <h3 className="text-xl font-black">{trackingData?.status || 'Connecting...'}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">"{trackingData?.message || 'Waiting for server update...'}"</p>
                    </div>

                    <button 
                      onClick={() => {
                        setIsTracking(false);
                        setTrackingData(null);
                      }}
                      className="w-full py-4 text-gray-400 font-bold hover:text-brand-orange transition-colors"
                    >
                      Track another order
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
