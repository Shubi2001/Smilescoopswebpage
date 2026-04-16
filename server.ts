import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import Stripe from "stripe";

async function startServer() {
  const app = express();
  app.use(express.json()); // Enable JSON body parsing
  
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // Mock delivery tracking logic
  const activeOrders = new Map();

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("track_order", (orderId) => {
      console.log(`Tracking order: ${orderId}`);
      socket.join(`order_${orderId}`);
      
      // If it's a new order, start a simulation
      if (!activeOrders.has(orderId)) {
        const statuses = [
          { status: "Order Confirmed", progress: 10, message: "We've received your order!" },
          { status: "Preparing", progress: 30, message: "Our chefs are scooping your favorites." },
          { status: "Out for Delivery", progress: 60, message: "Your ice cream is on the way!" },
          { status: "Arriving Soon", progress: 90, message: "The delivery partner is nearby." },
          { status: "Delivered", progress: 100, message: "Enjoy your Scoops & Smiles!" },
        ];
        
        let currentStep = 0;
        activeOrders.set(orderId, true);

        const interval = setInterval(() => {
          if (currentStep < statuses.length) {
            io.to(`order_${orderId}`).emit("order_update", {
              orderId,
              ...statuses[currentStep],
              timestamp: new Date().toISOString(),
            });
            currentStep++;
          } else {
            clearInterval(interval);
            activeOrders.delete(orderId);
          }
        }, 5000); // Update every 5 seconds for demo purposes
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) {
        return res.status(500).json({ error: "Stripe secret key not configured" });
      }
      
      const stripe = new Stripe(stripeKey);
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount || 1000, // Default to $10.00 if no amount provided
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Stripe error:", error);
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
