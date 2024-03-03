"use client";
import { AboutIcon, ServicesIcon } from "@/lib/icons";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 400,
  },
  animate: {
    duration: 5,
    opacity: 1,
    y: 0,
  },
};

export default function Services() {
  return (
    <div>
      <div
        className="mx-auto h-80 overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat mb-32"
        style={{
          backgroundImage: "url('/hero3.jpg')",
        }}
      ></div>
      <div className="container mx-auto flex flex-col lg:flex-row sm:flex-col xs:flex-col pb-40 gap-8 lg:gap-32 sm:gap-5 xs:gap-3">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <ServicesIcon width={60} height={60} />
          <h2 className="text-5xl tracking-tighter font-bold min-w-80 mt-5">
            Our Services
          </h2>
          <p className="mt-8">
            We offer wide range of cleaning services. Please refer our contact
            us page if you have special request.
          </p>
        </motion.div>
        <motion.div 
          className="text-lg leading-8 tracking-normal text-justify"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="mb-16">
            <h2 className="text-2xl font-bold tracking-tighter mb-4">
              House Cleaning
            </h2>
            <p>
              Choose Gandaki Cleaning Services for a cleaning experience that
              goes beyond the ordinary. Let us transform your space into a haven
              of cleanliness and freshness, enhancing the overall quality of
              your living or working environment. Join the countless satisfied
              clients who have made Gandaki Cleaning Services their preferred
              choice for cleaning solutions in Perth. Contact us today, and let
              us embark on a journey to elevate the cleanliness and hygiene of
              your space to new heights.
            </p>
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-bold tracking-tighter mb-4">
              Office Cleaning
            </h2>
            <p>
              Choose Gandaki Cleaning Services for a cleaning experience that
              goes beyond the ordinary. Let us transform your space into a haven
              of cleanliness and freshness, enhancing the overall quality of
              your living or working environment. Join the countless satisfied
              clients who have made Gandaki Cleaning Services their preferred
              choice for cleaning solutions in Perth. Contact us today, and let
              us embark on a journey to elevate the cleanliness and hygiene of
              your space to new heights.
            </p>
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-bold tracking-tighter mb-4">
              End of Lease Cleaning
            </h2>
            <p>
              Choose Gandaki Cleaning Services for a cleaning experience that
              goes beyond the ordinary. Let us transform your space into a haven
              of cleanliness and freshness, enhancing the overall quality of
              your living or working environment. Join the countless satisfied
              clients who have made Gandaki Cleaning Services their preferred
              choice for cleaning solutions in Perth. Contact us today, and let
              us embark on a journey to elevate the cleanliness and hygiene of
              your space to new heights.
            </p>
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-bold tracking-tighter mb-4">
              Glass Cleaning
            </h2>
            <p>
              Choose Gandaki Cleaning Services for a cleaning experience that
              goes beyond the ordinary. Let us transform your space into a haven
              of cleanliness and freshness, enhancing the overall quality of
              your living or working environment. Join the countless satisfied
              clients who have made Gandaki Cleaning Services their preferred
              choice for cleaning solutions in Perth. Contact us today, and let
              us embark on a journey to elevate the cleanliness and hygiene of
              your space to new heights.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
