"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/ui/icons";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center">
        <motion.div
          className="inline-block"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <Icons.logo className="h-16 w-16 text-primary" />
        </motion.div>
        <motion.h2
          className="mt-4 text-2xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading amazing content...
        </motion.h2>
        <motion.div
          className="mt-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-muted-foreground">Did you know?</p>
          <FactCycler />
        </motion.div>
      </div>
    </div>
  );
}

function FactCycler() {
  const facts = [
    "You can upload images up to 20MB in size.",
    "Our platform uses AI to enhance your images automatically.",
    "You can create custom albums to organize your photos.",
    "Sharing your images is as easy as copying a link.",
    "We support over 50 different image formats.",
  ];

  return (
    <motion.p
      className="h-6 text-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {facts[Math.floor(Math.random() * facts.length)]}
    </motion.p>
  );
}
