"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth-modal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-background to-secondary">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/10 rounded-full"
            style={{
              width: `${Math.random() * 250 + 100}px`,
              height: `${Math.random() * 250 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [
                `${Math.random() * 100 - 50}px`,
                `${Math.random() * 100 - 50}px`,
              ],
              y: [
                `${Math.random() * 100 - 50}px`,
                `${Math.random() * 100 - 50}px`,
              ],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 flex items-center h-full">
        <motion.div
          className="text-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Upload and Share Your Images with Ease
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience seamless image uploading and sharing with our
            cutting-edge platform.
          </p>
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 300,
              },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => setIsModalOpen(true)}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Hero;
