"use client";

import { motion } from "motion/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative mx-auto my-10 w-full max-w-7xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="div"
      >
        <h2 className="text-2xl font-bold text-black md:text-4xl dark:text-white">
          track your aura.
        </h2>
        <p className="mx-auto text-base font-normal text-neutral-700 md:text-lg dark:text-neutral-200">
          go to wallet page, add an event and calculate your aura using AI.
        </p>
        <Button asChild className="mt-3">
          <Link href="/wallet">
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
