"use client";
import PrimaryGlowButton from "../ui/buttons/primary-glow-button";
import { motion } from "framer-motion";

export default function InfoSection() {
  return (
    <>
      <div className="bg-transparent">
        <section className="relative py-12 sm:py-16 lg:pb-40">
          <div className="absolute bottom-0 right-0 overflow-hidden"> 
            <motion.div
              className="w-full cursor-pointer"
              animate={{
                y: [0, -12, 0], // up → down → up
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <img
                className="w-full h-auto origin-bottom-right transform scale-150 lg:w-auto lg:mx-auto lg:object-cover lg:scale-75"
                src="https://res.cloudinary.com/dh87x8i37/image/upload/v1770021324/background-pattern_jagr4q.png"
                alt=""
              />
            </motion.div>
          </div>

          <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-4 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
              <div className="text-center xl:col-span-1 lg:text-left md:px-16 lg:px-0 xl:pr-20">
                <h1
                  className=" text-3xl font-semibold leading-tighter text-zinc-900 dark:text-white sm:text-4xl md:text-5xl font-heading"
                >
                  A smarter way to market and scale your business..
                </h1>
                <p className="mt-2 text-lg text-gray-200 sm:mt-6 font-inter">
                  Data-backed digital strategies that drive visibility, leads, and long-term growth—without guesswork..
                </p>

                <div className="mt-10 flex flex-row gap-4">
                  <PrimaryGlowButton heading="Get Started Now" />
                </div>

                <div className="mt-8 sm:mt-16">
                  <div className="flex items-center justify-center lg:justify-start">
                    <svg
                      className="w-5 h-5 text-[#FDB241]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-[#FDB241]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-[#FDB241]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-[#FDB241]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-[#FDB241]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>

                  <blockquote className="mt-6">
                    <p className="font-heading text-md font-bold text-gray-100 font-pj">
                       A reliable partner for performance-driven marketing.
                    </p>
                    <p className="font-heading mt-3 text-base leading-7 text-gray-100 font-inter">
                      We build structured campaigns that help businesses attract the right audience and grow consistently.Focused on clarity, execution, and measurable outcomes.
                    </p>
                  </blockquote>

                  <div className="flex items-center justify-center mt-3 lg:justify-start">
                    <img
                      className="flex-shrink-0 object-cover w-6 h-6 overflow-hidden rounded-full"
                      src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/avatar-female.png"
                      alt=""
                    />
                    <p className="font-heading ml-2 text-base font-bold text-gray-100 font-pj">
                      Denny Jones
                    </p>
                  </div>
                </div>
              </div>

              <div className="xl:col-span-1 relative min-h-[500px] flex items-center justify-center">
  <img
    src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/illustration.png"
    alt="Illustration"
    className="absolute right-0 bottom-0 w-[500px] h-auto object-contain"
  />
</div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
