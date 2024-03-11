"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ContactIcon } from "@/lib/icons";
import { motion } from "framer-motion";
import { sendContactEmail } from "@/lib/mail";
import { toast } from "sonner";

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

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  return (
    <div>
      <div
        className="mx-auto h-80 overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat mb-32"
        style={{
          backgroundImage: "url('/contact.png')",
        }}
      ></div>
      <div className="container mx-auto flex flex-col lg:flex-row sm:flex-col xs:flex-col pb-40 gap-8 lg:gap-32 sm:gap-5 xs:gap-3">
        <motion.div variants={fadeInLeft} initial="initial" animate="animate">
          <ContactIcon height={60} width={60} />
          <h2 className="text-5xl tracking-tighter font-bold min-w-80 mt-5">
            Contact
          </h2>
          <p className="mt-8">
            We are team of professional cleaner with more than 10 years of
            experience.
          </p>
        </motion.div>
        <div className="text-lg leading-8 tracking-normal text-justify w-full">
          <motion.div
            variants={fadeInRight}
            initial="initial"
            animate="animate"
          >
            <form
              ref={formRef}
              action={(data) =>
                sendContactEmail(data).then(() => {
                  toast.success("Email sent");
                  formRef.current?.reset();
                  router.refresh();
                })
              }
            >
              <div className="mb-8">
                <input
                  type="text"
                  name="full_name"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-8">
                <input
                  type="email"
                  name="email"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  name="subject"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Inquiry of services"
                  required
                />
              </div>
              <div className="mb-8">
                <textarea
                  name="message"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Hi there, I am interested in your ..."
                  required
                />
              </div>
              <Button type="submit" className="mt-10">
                Send message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
