"use client";
import React, { useState, useEffect } from "react";
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

interface ServicesProps {
  services: {
    id: string;
    title: string;
    description: string;
  };
}

export default function Services() {
  const [data, setData] = useState<ServicesProps>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data: any) => {
        if (data) {
          setData(data);
          setLoading(false);
        } else {
          setLoading(true);
        }
      });
  }, []);

  console.log("ddddd", data);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div
            className="mx-auto h-80 overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat mb-32"
            style={{
              backgroundImage: "url('/hero3.jpg')",
            }}
          ></div>
          <div className="container mx-auto flex flex-col lg:flex-row sm:flex-col xs:flex-col pb-40 gap-8 lg:gap-32 sm:gap-5 xs:gap-3">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <ServicesIcon width={60} height={60} />
              <h2 className="text-5xl tracking-tighter font-bold min-w-80 mt-5">
                Our Services
              </h2>
              <p className="mt-8">
                We offer wide range of cleaning services. Please refer our
                contact us page if you have special request.
              </p>
            </motion.div>
            <motion.div
              className="text-lg leading-8 tracking-normal text-justify"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div>
                {Object.values(data?.services || []).map((service: any) => (
                  <div key={service.id} className="my-5">
                    <h3 className="text-3xl font-bold">{service.title}</h3>
                    <p className="mt-5">{service.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
