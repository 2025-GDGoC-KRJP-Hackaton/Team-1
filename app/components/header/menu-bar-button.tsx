"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { isMenuOpen } from "@/lib/states";

export default function MenuBarButton() {
  const [isOpen, setIsOpen] = useAtom(isMenuOpen);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button type="button" onClick={handleClick}>
      <Bars3Icon className="size-8" />
    </button>
  );
}
