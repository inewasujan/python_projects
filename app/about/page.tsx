"use client";
import { AboutIcon } from "@/lib/icons";
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

export default function About() {
  return (
    <div>
      <div
        className="mx-auto h-80 overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat mb-32"
        style={{
          backgroundImage: "url('/about.png')",
        }}
      ></div>
      <div className="container mx-auto flex flex-col lg:flex-row sm:flex-col xs:flex-col pb-40 gap-8 lg:gap-32 sm:gap-5 xs:gap-3">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
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
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <p className="first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-semibold">
            Welcome to Gandaki Cleaning Services, your trusted partner in
            creating spotless and pristine environments throughout Perth. At
            Gandaki Cleaning Services, we believe in the transformative power of
            a clean and well-maintained space. Our commitment is to deliver
            unparalleled cleaning services, tailored to meet the unique needs of
            our clients in Perth and its surrounding areas.{" "}
          </p>

          <p>
            Founded with the vision of elevating the standard of cleanliness in
            residential and commercial spaces, Gandaki Cleaning Services has
            become a beacon of reliability and excellence in the cleaning
            industry. Our journey began in Perth, driven by a passion for
            providing top-notch cleaning solutions that go beyond surface-level
            tidiness.
          </p>
          <br />
          <p>
            What sets Gandaki Cleaning Services apart is our unwavering
            dedication to customer satisfaction. We understand that a clean
            environment is not just about aesthetics but also about fostering a
            healthy and productive atmosphere. With this understanding, we have
            assembled a team of highly skilled and trained professionals who
            share our commitment to excellence.
          </p>
          <br />
          <p>
            Our team at Gandaki Cleaning Services takes pride in being thorough,
            meticulous, and detail-oriented in every task we undertake. From
            residential homes to commercial spaces, we tailor our services to
            suit the specific requirements of each client. We believe that a
            clean space contributes significantly to the overall well-being and
            productivity of individuals, and we strive to make that a reality
            for every client we serve.
          </p>
          <br />
          <p>
            As a locally owned and operated business, we take pride in being an
            integral part of the Perth community. We are committed to
            contributing positively to the neighborhoods we serve by creating
            clean, safe, and inviting spaces for residents and businesses alike.
          </p>
          <br />
          <p>
            Choose Gandaki Cleaning Services for a cleaning experience that goes
            beyond the ordinary. Let us transform your space into a haven of
            cleanliness and freshness, enhancing the overall quality of your
            living or working environment. Join the countless satisfied clients
            who have made Gandaki Cleaning Services their preferred choice for
            cleaning solutions in Perth. Contact us today, and let us embark on
            a journey to elevate the cleanliness and hygiene of your space to
            new heights.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
