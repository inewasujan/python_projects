"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fadeIn = {
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

interface TestimonyProps {
  testimony: {
    id: string;
    full_name: string;
    title: string;
    testimony: string;
    image_url: string;
    stars: number;
  };
}

export const SVG = ({ element, times }: any) => {
  const repeatedElements = [];
  for (let i = 0; i < times; i++) {
    repeatedElements.push(<div key={i}>{element}</div>);
  }

  return <>{repeatedElements}</>;
};

export default function Testimonials() {
  const [data, setData] = useState<TestimonyProps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonial")
      .then((res) => res.json())
      .then((data: any) => {
        if (data) {
          setData(data);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      });
  }, []);

  return (
    <section>
      <div>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <motion.div
            className="grid grid-cols-3 gap-8"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {Object.values(data?.testimony || []).map((testimony: any) => (
              <div
                className=" bg-white border border-solid border-gray-300 rounded-2xl p-6 transition-all duration-500 w-full max-w-md hover:border-indigo-600 mx-auto md:mr-0"
                key={testimony.id}
              >
                <div className="flex items-center mb-9 gap-2 text-amber-500 transition-all duration-500  group-hover:text-indigo-600">
                  <SVG
                    element={
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                    times={testimony.stars}
                  />
                </div>
                <p className="text-lg text-gray-500 leading-8 transition-all duration-500 mb-9 group-hover:text-gray-800">
                  {testimony.testimony}
                </p>
                <div className="flex items-center gap-5">
                  <img
                    src={testimony.image_url}
                    alt={testimony.full_name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="grid gap-1">
                    <h5 className="text-gray-900 font-medium capitalize transition-all duration-500  group-hover:text-indigo-600">
                      {testimony.full_name}
                    </h5>
                    <span className="text-sm leading-6 text-gray-500">
                      {testimony.title}{" "}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
