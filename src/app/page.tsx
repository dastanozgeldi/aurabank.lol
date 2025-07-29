"use client";

import dynamic from "next/dynamic";
import { globeConfig, sampleArcs } from "./globe-config";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false },
);

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative mx-auto my-10 h-144 w-full max-w-7xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="div"
        >
          <h2 className="text-2xl font-bold text-black dark:text-white md:text-4xl">
            track your aura.
          </h2>
          <p className="mx-auto text-base font-normal text-neutral-700 dark:text-neutral-200 md:text-lg">
            go to wallet page, add an event and calculate your aura using AI.
          </p>
          <Button asChild className="mt-3">
            <Link href="/wallet">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full select-none bg-linear-to-b from-transparent to-white dark:to-black" />
        <div className="mt-6 h-72 w-full md:h-full">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
