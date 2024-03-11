"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fadeInHeroHeader = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const fadeInHeroText = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
    },
  },
};

const fadeInHeroButton = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
    },
  },
};

export default function Hero() {
  return (
    <div>
      <div className="relative h-screen">
        <div
          className="absolute top-0 left-0 w-full h-full mx-auto overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat mb-32"
          style={{
            backgroundImage: "url('/hero2.jpg')",
          }}
        ></div>

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.h1
            className="text-7xl font-extrabold text-center tracking-tight"
            variants={fadeInHeroHeader}
            initial="initial"
            animate="animate"
            viewport={{ once: true }}
          >
            No spots remains uncleaned.
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-center mb-10"
            variants={fadeInHeroText}
            initial="initial"
            animate="animate"
            viewport={{ once: true }}
          >
            We are here to make your home and office clean and healthy.
          </motion.p>
          <motion.div
            variants={fadeInHeroButton}
            initial="initial"
            animate="animate"
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              className="text-white border-indigo-600 border-2 bg-indigo-600 hover:bg-transparent hover:text-white hover:border-white"
            >
              See our services
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
