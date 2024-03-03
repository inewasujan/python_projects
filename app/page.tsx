"use client"; 
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Hero from "@/components/hero";
import { HomeIcon } from "@radix-ui/react-icons";
import { CarpetIcon, EnterpriseIcon, OfficeIcon } from "@/lib/icons";
import Testimonials from "@/components/testimonial/page";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});



export default function Home() {
  return (
    <main>
      <Hero />
      <div className="bg-gradient-to-b from-indigo-50 to-slate-100">

        {/* what we do */}
        <div 
          className="container mx-auto flex justify-between items-center pt-32 pb-60"
          >
            <motion.div 
              className="w-2/4"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            
            >
              <h2 className="text-5xl tracking-tighter font-semibold">What we offer?</h2>
              <p className="mt-8 leading-8 mb-14 text-lg">
                With more than 10 years of experience. We are a award winning
                cleaning facility based in Perth. We give you 30 days money back
                guarantee if you are not satisfied with out services.{" "}
              </p>
              <Button className="bg-indigo-600 hover:bg-transparent border-2 border-indigo-600 hover:text-black hover:border-black hover:border-2"> See Details</Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <img src="/rand.png" width={450} height={0} alt="clean"/>
            </motion.div>
        </div>
        {/* what we do ends */}
        
        {/* services list */}
        <div className="pb-60 container mx-auto ">
        <motion.h2 
          className="text-5xl tracking-tighter font-semibold mb-10"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >What we offer</motion.h2>
        <motion.div 
          className="h-1 w-14 rounded-lg bg-indigo-600 mb-20"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}  
        ></motion.div>
          <div className="flex justify-between gap-20 flex-col lg:flex-row">
            <div className="grid grid-cols-3 gap-6">
              <motion.div 
                className="cleaning-services"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="hidden md:block">
                  <HomeIcon width={40} height={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Home Cleaning</h3>
                  <p>Clean your house like never before. </p>
                </div>
              </motion.div>
              <motion.div 
                className="cleaning-services"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="hidden md:block">
                  <OfficeIcon width={40} height={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Office Cleaning</h3>
                  <p>We offer wide range of office cleaning.</p>
                </div>
              </motion.div>
              <motion.div 
                className="cleaning-services"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="hidden md:block">
                  <CarpetIcon width={40} height={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Carpet Cleaning</h3>
                  <p>Clean your carpet and make it like new.</p>
                </div>
              </motion.div>
              <motion.div 
                className="cleaning-services"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="hidden md:block">
                  <EnterpriseIcon width={40} height={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Enterprise Cleaning
                  </h3>
                  <p>Packaged cleaning service at affordable price.</p>
                </div>
              </motion.div>
              <motion.div 
                className="cleaning-services"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="hidden md:block">
                  <EnterpriseIcon width={40} height={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Enterprise Cleaning
                  </h3>
                  <p>Packaged cleaning service at affordable price.</p>
                </div>
              </motion.div>
              <motion.div 
                className="cleaning-services"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="hidden md:block">
                  <EnterpriseIcon width={40} height={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Enterprise Cleaning
                  </h3>
                  <p>Packaged cleaning service at affordable price.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        {/* services  end */}

        

        {/* testimonials */}
        <div className="container mx-auto pb-60">
        <motion.h2 
          className="text-5xl tracking-tighter font-semibold mb-10"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}  
        >Testimonials</motion.h2>
        <motion.div 
          className="h-1 w-14 rounded-lg bg-indigo-600 mb-20" 
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        ></motion.div>
          <Testimonials />
        </div>
      {/* testimonials end */}
      </div>
    </main>
  );
}
