'use client';
import React from "react";
import Link from "next/link";
import { BackgroundGradient } from "../components/ui/background-gradient";

const Craft = () => {
  return (
    <div>
      <div className="w-auto max-w-fit mt-4">
        <BackgroundGradient className="justify-self-center rounded-[22px] bg-white dark:bg-zinc-900">
          <button className="rounded-full justify-items-center pl-3 pr-3 py-1 max-w-sm sm:p-2 text-white flex items-center font-bold">
            <Link href="/">Go back</Link>
          </button>
        </BackgroundGradient>
      </div>
    </div>
  );
};

export default Craft;
