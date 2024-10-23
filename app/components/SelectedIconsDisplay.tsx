import { FC, Key } from "react";
import Image from "next/image";
import { svgs } from "@/utils/importSvgs";
import { BackgroundGradient } from "./ui/background-gradient";
import Link from "next/link";

interface SelectedIconsDisplayProps {
  selectedIcons: string[];
}

const SelectedIconsDisplay: FC<SelectedIconsDisplayProps> = ({
  selectedIcons,
}) => {
  // Filter the imported svgs to get only those that are in selectedIcons
  const filteredSvgs = svgs.filter((svg: { default: string }) =>
    selectedIcons.includes(
      svg.default?.src.split("/").pop()?.replace(".svg", "") || ""
    )
  );
  console.log("filteredSvgs", filteredSvgs, "selectedIcons", selectedIcons);
  // Handle case where no icons are selected
  if (selectedIcons.length === 0) {
    return <div>No icons selected.</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* <h3 className="text-lg font-semibold mb-4">Selected Icons:</h3> */}
      <div className="flex flex-wrap gap-4 items-center">
        {filteredSvgs.map((svg, index: Key | null | undefined) => (
          <Image
            key={index}
            src={svg.default || ""}
            alt={`Selected Icon ${index + 1}`}
            width={48}
            height={48}
          />
        ))}
      </div>
      <div className="w-auto max-w-fit mt-4">
        <BackgroundGradient className="justify-self-center rounded-[22px] bg-white dark:bg-zinc-900">
          <button className="rounded-full justify-items-center pl-3 pr-3 py-1 max-w-sm sm:p-2 text-white flex items-center font-bold">
            <Link href="/craft">Create your stack</Link>
          </button>
        </BackgroundGradient>
      </div>
    </div>
  );
};

export default SelectedIconsDisplay;
