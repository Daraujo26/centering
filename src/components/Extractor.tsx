"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArcherContainer, ArcherElement } from "react-archer";

type RelationType = {
  targetId: string;
  sourceId: string;
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
    relations: RelationType[];
  }>(null);

  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVisible, setInputVisible] = useState(true);
  const [canRenderResults, setCanRenderResults] = useState(false);
  const [clearButtonVisible, setClearButtonVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateInput = (input: string): string | null => {
    const utterances = input
      .split(/[.\n]+/)
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const maxUtterances = 5;
    const maxWordsPerUtterance = 10;

    if (utterances.length === 0) {
      return "Input cannot be empty. Please enter at least one utterance.";
    }

    if (utterances.length > maxUtterances) {
      return `Input exceeds the maximum of ${maxUtterances} utterances.`;
    }

    for (const utterance of utterances) {
      const wordCount = utterance.split(/\s+/).length;
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
      setErrorMessage(validationError);
      return;
    }
    setErrorMessage(null);

    setLoading(true);
    setCanRenderResults(false);
    setClearButtonVisible(false);

    let data;
    try {
      const response = await fetch("https://taskeasy.org/center", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput }),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      data = await response.json();
      // console.log("Raw AllenNLP Response:", data);

      // ** Updated Validation **
      if (
        !data ||
        !data.results ||
        !Array.isArray(data.results.results) ||
        !Array.isArray(data.results.relations) ||
        !Array.isArray(data.sentences)
      ) {
        // console.error("Invalid Response Structure:", data);
        throw new Error("Invalid response structure from the backend.");
      }

      // Set the result
      setAnalysisResult({
        results: data.results.results, // Extract nested `results.results`
        relations: data.results.relations, // Extract `results.relations`
      });

      setCurrentIndex(0);
      setTimeout(() => {
        setInputVisible(false);
        setTimeout(() => {
          setCanRenderResults(true);
          setClearButtonVisible(true);
        }, 500);
      }, 500);
    } catch (error) {
      // console.error("Error fetching from backend:", error);
      setErrorMessage(
        "An error occurred. Please check your input and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const normalizeWord = (w: string) => w.replace(/[.,!?]/g, "").toLowerCase();

  const isWordInMentions = (word: string, mentions: string[]): boolean => {
    const normWord = normalizeWord(word);
    for (const mention of mentions) {
      const mentionWords = mention.split(/\s+/).map((mw) => normalizeWord(mw));
      if (mentionWords.includes(normWord)) {
        return true;
      }
    }
    return false;
  };

  const canHighlightCb = (Cb: string | null, sentence: string): boolean => {
    if (!Cb) return false;
    const sentenceNormalized = sentence.toLowerCase();
    const cbNormalized = Cb.toLowerCase();
    return sentenceNormalized.includes(cbNormalized);
  };

  const highlightTextWithAnchors = (
    sentence: string,
    Cb: string | null,
    Cf: string[],
    sentenceIndex: number,
    relations: RelationType[]
  ) => {
    const words = sentence.split(" ");
    const highlightCb = canHighlightCb(Cb, sentence);

    return words.map((word, wordIndex) => {
      const wordId = `word-${sentenceIndex}-${wordIndex}`;

      let isCb = false;
      if (Cb && highlightCb) {
        isCb = isWordInMentions(word, [Cb]);
      }

      const isCf = isWordInMentions(word, Cf);

      const outgoingRelations = relations
        .filter((rel) => rel.sourceId === wordId)
        .map((rel) => ({
          targetId: rel.targetId,
          sourceAnchor: rel.sourceAnchor,
          targetAnchor: rel.targetAnchor,
        }));

      return (
        <ArcherElement key={wordId} id={wordId} relations={outgoingRelations}>
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

    const { results, relations } = analysisResult;

    return (
      <ArcherContainer strokeColor="orange">
        <div className="space-y-4 mt-4">
          {results.map((result, index) => {
            const sentenceId = `sentence-${index}`;
            const subscriptIndex = `${index + 1}`
              .split("")
              .map((digit) => String.fromCharCode(0x2080 + Number(digit)))
              .join("");

            const sentenceLevelRelations = relations
              .filter((rel) => rel.sourceId === sentenceId)
              .map((rel) => ({
                targetId: rel.targetId,
                sourceAnchor: rel.sourceAnchor,
                targetAnchor: rel.targetAnchor,
              }));

            return (
              <ArcherElement
                key={index}
                id={sentenceId}
                relations={sentenceLevelRelations}
              >
                <motion.div
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
                    <span style={{ whiteSpace: "nowrap" }}>
                      {index <= currentIndex &&
                        highlightTextWithAnchors(
                          result.sentence,
                          result.Cb,
                          result.Cf,
                          index,
                          relations
                        )}
                    </span>
                  </div>
                  <div className="flex flex-col text-sm w-fit items-start">
                    <div style={{ whiteSpace: "nowrap" }}>
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
                    <div style={{ whiteSpace: "nowrap" }}>
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
              </ArcherElement>
            );
          })}
        </div>
      </ArcherContainer>
    );
  };

  return (
    <motion.div
      className="w-full p-4 rounded-lg shadow-md"
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
            <div className="flex flex-row items-center justify-evenly mb-4">
              <h2 className="w-full text-xl font-semibold">
                Try Your Own Sentences
              </h2>
            </div>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type up to 5 utterances, each with a maximum of 10 words."
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
            setErrorMessage(null);
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
