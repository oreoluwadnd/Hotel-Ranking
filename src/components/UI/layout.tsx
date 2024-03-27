import { ReactNode } from "react";
import Header from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <div className="max-w-[1536px] mx-auto flex flex-col font-inter h-full w-full ">
        <Header />
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}
