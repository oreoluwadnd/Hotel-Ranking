import { Button } from "../common/button";
import { icons as Icon } from "../common/icons";
import ChainCarousel from "./chain-carousel";

export default function Header() {
  const pathname = window.location.pathname;

  const isRootUrl = pathname === "/";
  return (
    <>
      <nav className="w-full sticky  inset-x-0 top-0 z-30 bg-white">
        <div className="flex justify-between p-4 border-b shadow-sm">
          <a href={"/"} className="flex items-center">
            <Icon.Hotel className="text-2xl text-[#E63E21]" />
            <h1 className="text-2xl font-bold text-[#E63E21]">FaceBook</h1>
            <h1 className="text-2xl font-bold">Tool</h1>
          </a>
          {isRootUrl && (
            <Button>
              <a href={"/new"}>Create</a>
            </Button>
          )}
        </div>
        {isRootUrl && <ChainCarousel />}
      </nav>
    </>
  );
}
