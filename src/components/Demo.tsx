import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Extractor from "./Extractor";
import { useDarkMode } from "@/components/DarkModeContext";

interface DemoProps {
  userInput: string;
  setUserInput: (input: string) => void;
}

export default function Demo({ userInput, setUserInput }: DemoProps) {
  const [showNotice, setShowNotice] = useState(true);
  const { darkMode } = useDarkMode();

  return (
    <main className="flex flex-col items-center justify-start gap-8">
      <AnimatePresence>
        {showNotice && (
          <motion.div
            className={`flex items-start justify-between gap-4 p-4 mb-4 rounded-lg shadow-md w-full max-w-5xl ${
              darkMode
                ? "bg-gray-700 text-white border-gray-500"
                : "bg-blue-100 text-blue-900 border-blue-300"
            } border`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="font-semibold text-lg mb-1">Notice</h3>
              <p className="text-sm">
                This demo uses Natural Language Processing (NLP) techniques to
                extract backward-looking (
                <span>
                  C<sub>b</sub>
                </span>
                ) and forward-looking (
                <span>
                  C<sub>f</sub>
                </span>
                ) centers from text. While it handles a variety of inputs, NLP
                models may not always interpret abstract or ambiguous references
                perfectly. For best results, input clear and concise sentences.
              </p>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                darkMode
                  ? "bg-gray-600 hover:bg-gray-500 text-white"
                  : "bg-blue-200 hover:bg-blue-300 text-blue-900"
              }`}
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex flex-col md:flex-row gap-6 w-full max-w-5xl"
        initial={{ y: 0 }}
        animate={{ y: showNotice ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Extractor Component */}
        <div className="flex md:w-2/3 order-2 md:order-1">
          <Extractor
            userInput={userInput}
            setUserInput={setUserInput}
            darkMode={darkMode}
          />
        </div>

        {/* Default Examples Section */}
        <section className="w-full md:w-1/3 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Default Examples</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div
              onClick={() =>
                setUserInput(
                  "John has been acting quite odd. He called up Mike yesterday. Mike was studying for his driver's test. He was annoyed by John's call."
                )
              }
              className={`p-4 cursor-pointer rounded-xl shadow-sm transition ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-700"
                  : "hover:bg-gray-200 bg-gray-300"
              }`}
            >
              <p className="text-base ">
                John has been acting quite odd. He called up Mike yesterday.
                Mike was studying for his driver&apos;s test. He was annoyed by
                John&apos;s call.
              </p>
            </div>
            <div
              onClick={() =>
                setUserInput(
                  "Jill caught a ball. She tossed it to John. He caught it while in the air."
                )
              }
              className={`p-4 cursor-pointer rounded-xl shadow-sm transition ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-700"
                  : "hover:bg-gray-200 bg-gray-300"
              }`}
            >
              <p className="text-base ">
                Jill caught a ball. She tossed it to John. He caught it while in
                the air.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
