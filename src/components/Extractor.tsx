"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArcherContainer, ArcherElement } from "react-archer";

type RelationType = {
  targetId: string;
  targetAnchor: "top" | "bottom" | "left" | "right";
  sourceAnchor: "top" | "bottom" | "left" | "right";
};

interface ExtractorProps {
  userInput: string;
  setUserInput: (input: string) => void;
  darkMode: boolean;
}

export default function Extractor({
  userInput,
  setUserInput,
  darkMode,
}: ExtractorProps) {
  const [analysisResult, setAnalysisResult] = useState<null | {
    results: { Cb: string | null; Cf: string[]; sentence: string }[];
  }>(null);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVisible, setInputVisible] = useState(true);
  const [canRenderResults, setCanRenderResults] = useState(false);
  const [clearButtonVisible, setClearButtonVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  const validateInput = (input: string): string | null => {
    const utterances = input
      .split(/[.\n]+/) // Split by periods or newlines
      .map((line) => line.trim()) // Remove leading/trailing whitespace
      .filter((line) => line !== ""); // Filter out empty lines

    const maxUtterances = 5;
    const maxWordsPerUtterance = 20;

    if (utterances.length === 0) {
      return "Input cannot be empty. Please enter at least one utterance.";
    }

    if (utterances.length > maxUtterances) {
      return `Input exceeds the maximum of ${maxUtterances} utterances.`;
    }

    for (const utterance of utterances) {
      const wordCount = utterance.split(/\s+/).length; // Count words
      if (wordCount > maxWordsPerUtterance) {
        return `Each utterance can have a maximum of ${maxWordsPerUtterance} words.`;
      }
    }

    return null;
  };

  useEffect(() => {
    if (analysisResult && currentIndex < analysisResult.results.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, analysisResult]);

  const handleExtractAttributes = async () => {
    const validationError = validateInput(userInput);
    if (validationError) {
      setErrorMessage(validationError); // Show validation error
      return;
    }
    setErrorMessage(null); // Clear any existing error messages

    setLoading(true);
    setCanRenderResults(false);
    setClearButtonVisible(false);

    try {
      const response = await fetch("https://taskeasy.org/center", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userInput }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`); // Custom error handling for non-2xx responses
      }

      const data = await response.json();

      if (!data || !data.results || data.results.length === 0) {
        throw new Error("No valid results were returned from the backend.");
      }

      setAnalysisResult(data);
      setCurrentIndex(0);

      setTimeout(() => {
        setInputVisible(false);
        setTimeout(() => {
          setCanRenderResults(true);
          setClearButtonVisible(true);
        }, 500);
      }, 500);
    } catch (error: any) {
      console.error("Error fetching from backend:", error);
      if (error.message.includes("500")) {
        setErrorMessage("Server encountered an error. Please try again later.");
      } else {
        setErrorMessage(
          "An error occurred while processing your request. Ensure your input is valid."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const highlightTextWithAnchors = (
    sentence: string,
    Cb: string | null,
    Cf: string[],
    index: number,
    results: { Cb: string | null; Cf: string[]; sentence: string }[]
  ) => {
    const words = sentence.split(" ");

    return words.map((word, wordIndex) => {
      const isCb = Cb && word === Cb;
      const isCf = Cf.includes(word);

      const wordId = `word-${index}-${wordIndex}`;
      const relations: RelationType[] = [];

      // Backward Relation: Connect Cb to Cf in the previous sentence
      if (isCb && index > 0) {
        const prevSentence = results[index - 1];
        const targetWordIndex = prevSentence.sentence
          .split(" ")
          .findIndex((w) => prevSentence.Cf.includes(Cb));
        if (targetWordIndex !== -1) {
          relations.push({
            targetId: `word-${index - 1}-${targetWordIndex}`,
            targetAnchor: "bottom",
            sourceAnchor: "top",
          });
        }
      }

      // Forward Relation: Connect Cf to Cb in the next sentence
      if (isCf && index < results.length - 1) {
        const nextSentence = results[index + 1];
        const targetWordIndex = nextSentence.sentence
          .split(" ")
          .findIndex((w) => nextSentence.Cb === word);
        if (targetWordIndex !== -1) {
          relations.push({
            targetId: `word-${index + 1}-${targetWordIndex}`,
            targetAnchor: "top",
            sourceAnchor: "bottom",
          });
        }
      }

      // Filter Out Invalid Relations
      const filteredRelations = relations.filter((rel) => {
        const sourceIndex = parseInt(wordId.split("-")[1], 10); // Source sentence index
        const targetIndex = parseInt(rel.targetId.split("-")[1], 10); // Target sentence index
        return targetIndex > sourceIndex; // Keep valid downward-pointing relations
      });

      return (
        <ArcherElement key={wordId} id={wordId} relations={filteredRelations}>
          <motion.span
            className={`${
              isCb
                ? "text-blue-500 font-bold"
                : isCf
                ? "text-green-500 font-bold"
                : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: wordIndex * 0.1 }}
          >
            {word + " "}
          </motion.span>
        </ArcherElement>
      );
    });
  };

  const renderAnalysisResult = () => {
    if (!analysisResult || !canRenderResults) return null;

    const { results } = analysisResult;

    return (
      <ArcherContainer strokeColor="orange">
        <div className="space-y-4 mt-4">
          {results.map((result, index) => {
            const subscriptIndex = `${index + 1}`
              .split("")
              .map((digit) => String.fromCharCode(0x2080 + Number(digit)))
              .join("");

            return (
              <motion.div
                key={index}
                className="flex justify-between gap-4 items-center p-4 border rounded shadow-md"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: index <= currentIndex ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <div className="text-sm">
                  <span className="font-semibold">U{subscriptIndex}:</span>{" "}
                  {index <= currentIndex && (
                    <div className="inline-block">
                      {highlightTextWithAnchors(
                        result.sentence,
                        result.Cb,
                        result.Cf,
                        index,
                        results
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-sm space-y-1 w-fit items-start">
                  <div>
                    <strong>
                      C<sub>b</sub>:
                    </strong>{" "}
                    <span
                      style={{
                        color: result.Cb ? "blue" : "gray",
                        fontWeight: result.Cb ? "bold" : "normal",
                      }}
                    >
                      {result.Cb || "None"}
                    </span>
                  </div>
                  <div>
                    <strong>
                      C<sub>f</sub>:
                    </strong>{" "}
                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      {"{"}
                      {result.Cf.join(", ")}
                      {"}"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ArcherContainer>
    );
  };

  return (
    <motion.div
      className="w-3/4 p-6 rounded-lg shadow-md"
      initial={{ height: "auto" }}
      animate={{
        height: analysisResult ? "auto" : 300,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <AnimatePresence>
        {inputVisible && (
          <motion.div
            key="input-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h2 className="text-xl font-semibold mb-4">
              Try Your Own Sentences
            </h2>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type up to 5 utterances, each with a maximum of 20 words."
              className={`w-full p-3 mb-4 border border-gray-600 rounded-lg ${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
              } text-sm`}
              rows={6}
            />
            <button
              onClick={handleExtractAttributes}
              className={`px-3 py-1 ${
                loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              } rounded-lg shadow-md text-white text-sm`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Analyze"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {analysisResult && canRenderResults && (
          <motion.div
            key="analysis-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderAnalysisResult()}
          </motion.div>
        )}
      </AnimatePresence>

      {analysisResult && (
        <button
          onClick={() => {
            setCanRenderResults(false);
            setClearButtonVisible(false);
            setErrorMessage(null); // Clear error message
            setTimeout(() => {
              setAnalysisResult(null);
              setUserInput("");
              setCurrentIndex(0);
              setInputVisible(true);
            }, 500);
          }}
          className={`px-4 py-2 bg-red-500 rounded-lg shadow-md hover:bg-red-600 text-white mt-4 transition-opacity duration-500 ${
            clearButtonVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Clear
        </button>
      )}

      {errorMessage && (
        <motion.div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {errorMessage}
        </motion.div>
      )}
    </motion.div>
  );
}
