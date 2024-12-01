"use client";

import { motion, LazyMotion, domAnimation } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Fast Uploads",
    description: "Upload your images in seconds with our optimized process.",
  },
  {
    title: "Secure Storage",
    description: "Your images are encrypted and stored securely in the cloud.",
  },
  {
    title: "Easy Sharing",
    description: "Share your images with anyone using a simple link.",
  },
  {
    title: "Organization",
    description: "Organize your images with tags and custom albums.",
  },
];

const cardVariants = {
  initial: {
    scale: 1,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 15px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

const buttonVariants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.1,
    rotate: [0, -2, 2, 0],
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
      rotate: {
        type: "tween",
        duration: 0.3,
      },
    },
  },
};

const Body = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-20 bg-background" id="get-started">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Choose Our Platform?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  className="h-full"
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">Feature</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            ></motion.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Body;
