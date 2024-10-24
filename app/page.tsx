"use client";
import { useState, useMemo, ChangeEvent } from "react";
import { Grid2, ListItemIcon, TextField } from "@mui/material";
import Image from "next/image";
import { svgs } from "../utils/importSvgs";
import { Key } from "react";
import SelectedIconsDisplay from "./components/SelectedIconsDisplay"; // Import the new component

export default function Home() {
  // State to keep track of the search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State to keep track of the selected icons
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);

  // Function to handle search query changes
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle icon selection/unselection
  const handleIconClick = (filename: string) => {
    setSelectedIcons((prevSelectedIcons) => {
      if (prevSelectedIcons.includes(filename)) {
        // If icon is already selected, remove it
        return prevSelectedIcons.filter((icon) => icon !== filename);
      } else {
        // Otherwise, add it to the list of selected icons
        return [...prevSelectedIcons, filename];
      }
    });
  };

  // Use useMemo to memoize filtered results to avoid recalculating on every render
  const filteredSvgs = useMemo(
    () =>
      svgs.filter((svg: { default: { src: string } }) =>
        svg.default?.src.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, svgs]
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-top justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        {/* Display selected icons */}
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Search and select the technology (icons) you are familiar with.{" "}
          </li>
          <li>
            Export your stack as a beautiful React component or simple css.
          </li>
        </ol>
        <div className="w-full mt-8">
          <SelectedIconsDisplay selectedIcons={selectedIcons} />
        </div>
        <TextField
          className="w-full dark:invert"
          id="filled-search"
          label="Search icons"
          type="search"
          variant="filled"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {filteredSvgs.map(
            (
              svg: { default: { src: string } },
              index: Key | null | undefined
            ) => {
              const filename =
                svg.default?.src.split("/").pop()?.replace(".svg", "") ||
                `SVG ${index + 1}`;
              const isSelected = selectedIcons.includes(filename);
              return (
                <ListItemIcon
                  key={index}
                  xs={2}
                  sm={4}
                  md={6}
                  onClick={() => handleIconClick(filename)}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    className={`large-icon ${isSelected ? "selected" : ""}`}
                    src={svg.default || ""}
                    alt={filename}
                    width={48}
                    height={48}
                    loading="lazy"
                    style={{
                      border: isSelected ? "2px solid blue" : "none",
                      borderRadius: "4px",
                    }}
                  />
                </ListItemIcon>
              );
            }
          )}
        </Grid2>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
