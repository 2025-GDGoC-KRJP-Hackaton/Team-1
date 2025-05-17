"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { isMenuOpen } from "@/lib/states";

export default function MenuOptions() {
  const [isOpen] = useAtom(isMenuOpen);

  console.log(isOpen);

  return (
    <div
      className={`w-screen h-screen bg-neutral-100 fixed top-0 left-0 p-4 bg-neutral flex flex-col gap-4 items-center justify-center transition-all duration-300 z-0 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-4">
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>
      </div>
      <div>
        <div>Sign Out / Sign In</div>
      </div>
    </div>
  );
}
