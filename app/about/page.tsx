"use client";
import React, { useState, useEffect } from "react";
import { AboutIcon } from "@/lib/icons";
import { motion } from "framer-motion";

const fadeInLeft = {
  initial: {
    opacity: 0,
    x: -300,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.5,
      Easing: "easeInOut",
    },
  },
};

const fadeInRight = {
  initial: {
    opacity: 0,
    x: 300,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.5,
      Easing: "easeInOut",
    },
  },
};

interface About {
  about: {
    id: string;
    title: string;
    description: string;
  };
}

export default function About() {
  const [data, setData] = useState<About>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <div
        className="mx-auto h-80 overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat mb-32"
        style={{
          backgroundImage: "url('/about.png')",
        }}
      ></div>
      <div className="container mx-auto flex flex-col lg:flex-row sm:flex-col xs:flex-col pb-40 gap-8 lg:gap-32 sm:gap-5 xs:gap-3">
        <motion.div variants={fadeInLeft} initial="initial" animate="animate">
          <AboutIcon width={60} height={60} />
          <h2 className="text-5xl tracking-tighter font-bold min-w-80 mt-5">
            About us
          </h2>
          <p className="mt-8">
            We are team of professional cleaner with more than 10 years of
            experience.
          </p>
        </motion.div>
        <motion.div
          className="text-lg leading-8 tracking-normal text-justify italic"
          variants={fadeInRight}
          initial="initial"
          animate="animate"
        >
          <p className="first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-semibold">
            {data.about.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
