import Link from "next/link";
import MenuBarButton from "./menu-bar-button";
import MenuOptions from "./menu-options";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="w-full p-4 flex justify-between items-center z-10 fixed top-0 left-0 bg-neutral-50 lg:px-24">
        <div className={"flex items-center justify-center gap-2"}>
          <Image
            src={"/icon.png"}
            alt={"UnbAIsly Logo"}
            width={50}
            height={50}
          />
          <Link href={"/"} className="text-xl font-bold">
            UnbAIsly
          </Link>
        </div>
        <MenuBarButton />
      </div>
      <MenuOptions />
    </>
  );
}
