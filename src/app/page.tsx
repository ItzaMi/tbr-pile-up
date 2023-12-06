"use client";
import { ChangeEvent, useState } from "react";
import Papa from "papaparse";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const pageThickness = 0.1 / 1000;

  const [file, setFile] = useState<null | File>(null);
  const [totalThickness, setTotalThickness] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [bookWithMostPages, setBookWithMostPages] = useState<{
    title: string;
    pages: string;
  } | null>(null);
  const [bookWithLeastPages, setBookWithLeastPages] = useState<{
    title: string;
    pages: string;
  } | null>(null);
  const [numberOfBooksPerMonth, setNumberOfBooksPerMonth] = useState(20);

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
            Title: row["title"],
            "Number of pages": row["number of pages"],
            "Exclusive Shelf": row["exclusive shelf"],
          }));

          const bookWithMostPages = extractedData.reduce((prev, current) =>
            Number(prev["Number of pages"]) > Number(current["Number of pages"])
              ? prev
              : current
          );
          setBookWithMostPages({
            title: bookWithMostPages["Title"],
            pages: bookWithMostPages["Number of pages"],
          });

          const bookWithLeastPages = extractedData.reduce((prev, current) => {
            if (prev["Number of pages"] === "") {
              return current;
            } else {
              return Number(prev["Number of pages"]) <
                Number(current["Number of pages"])
                ? prev
                : current;
            }
          });

          setBookWithLeastPages({
            title: bookWithLeastPages["Title"],
            pages: bookWithLeastPages["Number of pages"],
          });

          const totalNumberOfPages = extractedData.reduce(
            (sum, row) => sum + Number(row["Number of pages"]),
            0
          );
          setTotalNumberOfPages(totalNumberOfPages);

          const totalThickness = totalNumberOfPages * pageThickness;
          setTotalThickness(Number(Number(totalThickness).toFixed(2)));
        },
      });
    };

    reader.readAsText(file);
  };

  const handleChangeOfReadBooks = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberOfBooksPerMonth(Number(e.target.value));
  };

  return (
    <main className="flex min-h-screen flex-col items-start md:p-24 sm:p-12 p-6 gap-4">
      <h1 className="md:text-8xl sm:text-5xl text-3xl font-black max-w-[900px]">
        Find how long your TBR really is
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
          <div className="h-px bg-zinc-500 w-full my-2" />
          <div>
            <p className="text-gray-500">Here are some other fun facts!</p>
            <ul className="flex flex-col gap-1">
              <li>
                📚 That&apos;s <strong>{totalThickness} meters</strong> of
                books!
              </li>
              <li>
                📚 The largest book in your TBR is{" "}
                <strong>{bookWithMostPages?.title}</strong> with{" "}
                <strong>{bookWithMostPages?.pages}</strong> pages!
              </li>
              <li>
                📚 The smallest book in your TBR is{" "}
                <strong>{bookWithLeastPages?.title}</strong> with{" "}
                <strong>{bookWithLeastPages?.pages}</strong> pages!
              </li>
              <li>
                📚 If you read{" "}
                <span>
                  <input
                    value={numberOfBooksPerMonth}
                    type="text"
                    onChange={handleChangeOfReadBooks}
                    className="border-b border-zinc-500 w-[80px] text-center font-black"
                  />
                </span>{" "}
                pages per month, it would take you{" "}
                <strong>
                  {Math.round(totalNumberOfPages / numberOfBooksPerMonth)}{" "}
                  months
                </strong>{" "}
                to finish your TBR!
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
