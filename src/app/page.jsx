"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { FlipWords } from "@/components/ui/flip-words";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gdg2 from "./gdglogo2.png";
import tiu from "./tiu.png";

const Page = () => {
  const words = ["GenAI", "Cloud", "WebTech", "Android", "DSA", "Design"];
  const router = useRouter();

  return (
    <main>
      <AuroraBackground className="overflow-x-hidden">
        {/* Links at the top left */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 flex gap-10 text-white">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Team
          </a>
          <a href="#" className="hover:underline">
            Gallery
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>

        {/* Resized logo in the top left corner */}
        <div className="absolute top-13 left-14.5 p-3 sm:top-0 sm:left-0">
          <Image unoptimized src={gdg2} height={90} width={170} alt="gdg2" />
        </div>

        {/* Centered content */}
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col gap-4 items-center justify-center px-4 mt-17"
        >
          {/* Resized logo in the top right corner */}
          <div className="absolute bottom-14 left-14.5 p-3 sm:top-0 sm:right-0">
            <Image unoptimized src={tiu} height={60} width={100} alt="tiu" />
          </div>

          <div className="text-3xl md:text-5xl font-bold dark:text-white text-center">
            Join the Core as
            <br /> <FlipWords words={words} duration={1000} />
            Enthusiast
            <br />
          </div>
          <div className="font-light text-center md:text-2xl dark:text-neutral-200 py-4 w-[80%]">
            GDG On Campus. Register today!
          </div>
          <button
            className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#000000] rounded-md font-semibold transition duration-200 ease-linear z-50"
            onClick={() => {
              router.push("/core/register/");
            }}
          >
            Register Now
          </button>
        </motion.div>

        <footer className="absolute bottom-0 w-full text-center py-4">
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 dark:text-gray-400">
            © 2025 <span>GDG On Campus TIU</span>. All Rights Reserved.
          </span>
        </footer>
      </AuroraBackground>
    </main>
  );
};

export default Page;
