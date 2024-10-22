import { FC, Key } from "react";
import Image from "next/image";
import { svgs } from "@/utils/importSvgs";

interface SelectedIconsDisplayProps {
  selectedIcons: string[];
}

const SelectedIconsDisplay: FC<SelectedIconsDisplayProps> = ({
  selectedIcons,
}) => {
  // Filter the imported svgs to get only those that are in selectedIcons
  const filteredSvgs = svgs.filter((svg: { default: string; }) =>
    selectedIcons.includes(svg.default?.src.split("/").pop()?.replace(".svg", "") || "")
  );
console.log("filteredSvgs", filteredSvgs, "selectedIcons", selectedIcons);
  // Handle case where no icons are selected
  if (selectedIcons.length === 0) {
    return <div>No icons selected.</div>;
  }

  return (
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
  );
};

export default SelectedIconsDisplay;
