"use client";

import { ReactNode, useState } from "react";
import { motion } from "motion/react";

export default function SummarizedText({ children }: { children: ReactNode }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={"p-4"}>
      <button
        type={"button"}
        onClick={() => setShowMore(true)}
        className={`${showMore ? "hidden" : ""} text-base cursor-pointer p-2 rounded-lg ring-2 ring-neutral-500`}
      >
        Read Summarized Text
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0, y: 20 }}
        animate={{
          height: showMore ? "auto" : 0,
          opacity: showMore ? 1 : 0,
          y: showMore ? 0 : 20,
        }}
        exit={{ height: 0, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden ring-2 p-2 ring-neutral-500 rounded-lg mb-4"
      >
        <p className={"text-lg font-semibold"}>Summarized Text</p>
        <p>{children}</p>
      </motion.div>
      <div className={"not-md:hidden"}>{children}</div>
    </div>
  );
}
