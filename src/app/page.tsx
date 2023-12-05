"use client";
import { ChangeEvent, useState } from "react";
import Papa from "papaparse";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const pageThickness = 0.0025 / 1000;

  const [file, setFile] = useState<null | File>(null);
  const [totalThickness, setTotalThickness] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFile(e.target.files[0]);
  };

  const handleParseData = () => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;

      Papa.parse(text, {
        header: true,
        transformHeader: (header) => header.toLowerCase(),
        complete: function (results) {
          const filteredData = results.data.filter(
            (row: any) => row["exclusive shelf"] === "to-read"
          );
          const extractedData = filteredData.map((row: any) => ({
            "Number of pages": row["number of pages"],
            "Exclusive Shelf": row["exclusive shelf"],
          }));

          const totalNumberOfPages = extractedData.reduce(
            (sum, row) => sum + Number(row["Number of pages"]),
            0
          );
          setTotalNumberOfPages(totalNumberOfPages);

          const totalThickness = totalNumberOfPages * pageThickness;
          setTotalThickness(totalThickness);
        },
      });
    };

    reader.readAsText(file);
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-24 gap-4">
      <h1 className="text-8xl font-black max-w-[900px]">
        Find our long your TBR really is
      </h1>
      <p className="text-gray-500">
        Export your library from{" "}
        <a
          className="underline text-blue-600"
          href="https://www.goodreads.com/review/import"
          target="_blank"
        >
          Goodreads
        </a>{" "}
        and upload it below!
      </p>

      <div>
        <Input
          placeholder="Upload your Goodreads CSV"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
      </div>

      <Button onClick={handleParseData}>Show it to me!</Button>

      {totalNumberOfPages > 0 && (
        <div className="border rounded-md border-zinc-500 p-8 w-full">
          <p className="text-xl">
            Your TBR has a total of <strong>{totalNumberOfPages} pages!</strong>
          </p>
        </div>
      )}
    </main>
  );
}
