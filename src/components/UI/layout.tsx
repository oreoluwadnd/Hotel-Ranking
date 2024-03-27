import { ReactNode } from "react";
import Header from "./header";
// import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="max-w-[1536px] mx-auto flex flex-col min-h-screen font-inter h-full w-full ">
        <Header />
        <main className="w-full h-full">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
