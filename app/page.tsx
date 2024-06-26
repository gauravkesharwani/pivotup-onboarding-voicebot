"use client";

import Image from "next/image";
import GitHubButton from "react-github-btn";

export const runtime = "edge";
import { init } from "@fullstory/browser";
import { useEffect } from "react";
import { XIcon } from "./components/icons/XIcon";
import { FacebookIcon } from "./components/icons/FacebookIcon";
import { LinkedInIcon } from "./components/icons/LinkedInIcon";
import Conversation from "./components/Conversation";

export default function Home() {
  useEffect(() => {
    init({ orgId: "5HWAN" });
  }, []);

  return (
    <>
      <div className="h-full overflow-hidden">
        {/* height 4rem */}
        <div className="bg-gradient-to-b from-black/50 to-black/10 backdrop-blur-[2px] h-[4rem] flex items-center">
        
        </div>

        {/* height 100% minus 8rem */}
        <main className="mx-auto max-w-7xl  px-4 md:px-6 lg:px-8 h-[calc(100%-8rem)]">
          <Conversation />
        </main>

        {/* height 4rem */}
        <div className=" backdrop-blur-[2px] h-[4rem] flex items-center">
        
        </div>
      </div>
    </>
  );
}
