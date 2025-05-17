import Link from "next/link";
import MenuBarButton from "./menu-bar-button";
import MenuOptions from "./menu-options";

export default function Header() {
  return (
    <>
      <div className="w-full p-4 flex justify-between items-center z-10 fixed top-0 left-0 bg-neutral-50">
        <Link href={"/"} className="text-xl font-bold">
          UnbAIsly
        </Link>
        <MenuBarButton />
      </div>
      <MenuOptions />
    </>
  );
}
