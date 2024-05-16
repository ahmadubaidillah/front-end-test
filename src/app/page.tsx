"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <div className="tabs mb-4">
          <button
            className={`tab ${activeTab === 0 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(0)}
          >
            Tab 1
          </button>
          <button
            className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Tab 2
          </button>
        </div>
        {activeTab === 0 ? <TabOne /> : <TabTwo />}
      </main>
      <Footer />
    </div>
  );
};

const TabOne: React.FC = () => {
  const [text, setText] = useState("");
  const [words, setWords] = useState<{ [key: string]: number }>({});

  const handleClick = () => {
    const wordsArray = text.toLowerCase().match(/\w+/g) || [];
    const wordsCount = wordsArray.reduce(
      (acc: { [key: string]: number }, word: string) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      },
      {}
    );
    setWords(wordsCount);
  };

  const handleDeleteWord = (wordToDelete: string) => {
    setWords((preWords) => {
      const newWords = { ...preWords };
      delete newWords[wordToDelete];
      return newWords;
    });
    setText((prevText) =>
      prevText
        .split(/\s+/)
        .filter((word) => word.toLowerCase() !== wordToDelete)
        .join(" ")
    );
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-2">
        <textarea
          className="w-full h-40 border p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2"
          onClick={handleClick}
        >
          Klik
        </button>
      </div>
      <div className="w-1/2 p-2">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Kata</th>
              <th className="border border-gray-300 p-2">Jumlah Kata</th>
              <th className="border border-gray-300 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(words)
              .sort()
              .map((word) => (
                <tr key={word}>
                  <td className="border border-gray-300 p-2">{word}</td>
                  <td className="border border-gray-300 p-2">{words[word]}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteWord(word)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TabTwo: React.FC = () => {
  const [number, setNumber] = useState<number | "">("");
  const [boxes, setBoxes] = useState<number>(0);

  const handleButtonClick = () => {
    if (typeof number === "number" && number > 0 && number <= 10000) {
      setBoxes(number);
    }
  };

  return (
    <div>
      <input
        type="number"
        className="border p-2"
        value={number}
        onChange={(e) =>
          setNumber(e.target.value === "" ? "" : Number(e.target.value))
        }
      />
      <button
        className="ml-2 bg-blue-500 text-white px-4 py-2"
        onClick={handleButtonClick}
      >
        Generate Boxes
      </button>
      <div className="mt-4 grid grid-cols-auto gap-2">
        {Array.from({ length: boxes }).map((_, index) => (
          <div key={index} className="box bg-black"></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
