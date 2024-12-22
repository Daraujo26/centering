"use client";

import Navbar from "@/components/Navbar";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDarkMode } from "@/components/DarkModeContext";
import localFont from "next/font/local";
import BlurFade from "@/components/ui/blur-fade";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function ImplementationPage() {
  const { darkMode } = useDarkMode();

  return (
    <html
      lang="en"
      className={`${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
      }`}
    >
      <body
        className={`${geistSans.variable} ${
          geistMono.variable
        } antialiased relative ${
          darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
        }`}
      >
        <div
          className={`w-full min-h-screen ${
            darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
          } transition-colors duration-300`}
        >
          <main className="grid grid-rows-[auto_1fr_auto] mx-auto py-4 gap-8 font-[family-name:var(--font-geist-sans)] w-full max-w-screen-xl mb-10">
            <Navbar />
            <BlurFade>
              <div className="flex flex-col items-center justify-center py-6 mt-10">
                <div className="max-w-screen-xl w-full px-4">
                  <section className="flex flex-col items-center gap-8 p-6 rounded-lg shadow-md">
                    <div className="w-full max-w-4xl">
                      <header className="flex items-center gap-4 mb-6 pl-4">
                        <FontAwesomeIcon icon={faGear} size="2x" />
                        <h1 className="text-2xl font-bold">
                          Understanding the Demo
                        </h1>
                      </header>

                      <p className="text-lg text-center mb-8">
                        This page offers a deep dive into the technologies and
                        processes powering the Centering Theory Demo. It is
                        tailored for developers and enthusiasts eager to
                        understand the mechanics of{" "}
                        <a
                          href="https://en.wikipedia.org/wiki/Natural_language_processing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Natural Language Processing (NLP)
                        </a>{" "}
                        and discourse coherence analysis.
                      </p>

                      <div className="space-y-12">
                        {/* Frontend Section */}
                        <section>
                          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                            Frontend
                          </h2>
                          <p className="text-base leading-relaxed mb-4">
                            The frontend is designed to provide a seamless and
                            interactive user experience. Built using{" "}
                            <a
                              href="https://nextjs.org/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Next.js
                            </a>{" "}
                            and{" "}
                            <a
                              href="https://react.dev/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              React
                            </a>
                            , it ensures fast rendering and a responsive UI.
                            Below is an example of how a request is sent to the
                            backend:
                          </p>
                          <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md overflow-auto">
                            <pre>
                              {`const handleExtractAttributes = async () => {
  const response = await fetch("/center", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: userInput }),
  });
  const data = await response.json();
  setAnalysisResult(data.results);
};`}
                            </pre>
                          </div>
                          <p className="text-sm mt-2">
                            This function sends user input to the backend for
                            processing and updates the results state for
                            rendering dynamic visualizations.
                          </p>
                          <p className="text-base leading-relaxed mt-4">
                            To bring the discourse relationships to life, the
                            frontend leverages{" "}
                            <a
                              href="https://motion.dev/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Framer Motion
                            </a>{" "}
                            for smooth animations,{" "}
                            <a
                              href="https://magicui.design/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              MagicUI
                            </a>{" "}
                            for stylish transitions, and{" "}
                            <a
                              href="https://github.com/pierpo/react-archer"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Archer.js
                            </a>{" "}
                            for rendering anchored relationships. For instance:
                          </p>
                          <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md overflow-auto">
                            <pre>
                              {`<ArcherContainer>
  <ArcherElement id="root">
    <div>Root Element</div>
  </ArcherElement>
  <ArcherElement id="child" relations={[{ targetId: "root", sourceAnchor: "bottom", targetAnchor: "top" }]}>
    <div>Child Element</div>
  </ArcherElement>
</ArcherContainer>`}
                            </pre>
                          </div>
                          <p className="text-base mt-4">
                            This structure ensures clarity in how elements are
                            dynamically connected, making the discourse analysis
                            intuitive and visually engaging.
                          </p>
                        </section>

                        {/* Backend Section */}

                        <section>
                          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                            Backend
                          </h2>
                          <p className="text-base leading-relaxed mb-4">
                            The backend processes user input, resolves
                            coreferences, and extracts discourse attributes. It
                            is built using{" "}
                            <a
                              href="https://flask.palletsprojects.com/en/stable/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Flask
                            </a>{" "}
                            for routing and{" "}
                            <a
                              href="https://github.com/allenai/allennlp"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              AllenNLP
                            </a>{" "}
                            for handling coreference resolution.
                          </p>
                          <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md overflow-auto">
                            <pre>
                              {`@app.route('/center', methods=['POST'])
def center():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    text = data['text']
    grouped_sentences, clusters, tokens = process_text(text)
    results = extract_centering(grouped_sentences, clusters, tokens)
    return jsonify({'sentences': grouped_sentences, 'results': results})`}
                            </pre>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md overflow-auto">
                              <h3 className="text-lg font-semibold mb-2">
                                Example Request Body
                              </h3>
                              <pre>
                                {`{
  "text": "John has been acting quite odd. He called up Mike yesterday. Mike was studying for his driver's test. He was annoyed by John's call."
}`}
                              </pre>
                            </div>
                            <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md overflow-auto">
                              <h3 className="text-lg font-semibold mb-2">
                                Example Response
                              </h3>
                              <pre>
                                {`{
  "results": {
    "relations": [
      {
        "sourceAnchor": "bottom",
        "sourceId": "word-0-0",
        "targetAnchor": "top",
        "targetId": "word-1-0"
      },
      {
        "sourceAnchor": "bottom",
        "sourceId": "word-1-3",
        "targetAnchor": "top",
        "targetId": "word-2-0"
      },
      {
        "sourceAnchor": "bottom",
        "sourceId": "word-1-3",
        "targetAnchor": "top",
        "targetId": "word-2-4"
      },
      {
        "sourceAnchor": "bottom",
        "sourceId": "word-2-0",
        "targetAnchor": "top",
        "targetId": "word-3-0"
      }
    ],
    "results": [
      {
        "Cb": null,
        "Cf": ["John"],
        "sentence": "John has been acting quite odd."
      },
      {
        "Cb": "John",
        "Cf": ["He", "Mike", "called"],
        "sentence": "He called up Mike yesterday."
      },
      {
        "Cb": "Mike",
        "Cf": ["Mike", "his"],
        "sentence": "Mike was studying for his driver's test."
      },
      {
        "Cb": "Mike",
        "Cf": ["John's", "He", "John's call"],
        "sentence": "He was annoyed by John's call."
      }
    ]
  },
  "sentences": [
    "John has been acting quite odd.",
    "He called up Mike yesterday.",
    "Mike was studying for his driver's test.",
    "He was annoyed by John's call."
  ]
}`}
                              </pre>
                            </div>
                          </div>
                        </section>

                        {/* Challenges Section */}
                        <section>
                          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                            Challenges and Limitations
                          </h2>
                          <p className="text-base leading-relaxed mb-4">
                            Developing this demo posed challenges in balancing
                            performance, accuracy, and user experience:
                          </p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>
                              <strong>Context-Sensitive Terms:</strong> Words
                              like &quot;this&quot; or &quot;it&quot; require
                              sophisticated modeling to resolve their meanings
                              accurately.
                            </li>
                            <li>
                              <strong>Computational Demand:</strong> Coreference
                              resolution and discourse analysis require
                              significant resources, which may limit
                              scalability.
                            </li>
                            <li>
                              <strong>Data Validation:</strong> Ensuring user
                              input adheres to constraints is crucial for
                              reliable processing.
                            </li>
                          </ul>
                        </section>

                        {/* System Overview */}
                        <section>
                          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                            System Overview
                          </h2>
                          <p className="text-base leading-relaxed mb-4">
                            The demo operates on a well-integrated stack:
                          </p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>
                              <a
                                href="https://react.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                React
                              </a>{" "}
                              and{" "}
                              <a
                                href="https://nextjs.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                Next.js
                              </a>{" "}
                              for the frontend.
                            </li>
                            <li>
                              <a
                                href="https://flask.palletsprojects.com/en/stable/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                Flask
                              </a>{" "}
                              for backend routing.
                            </li>
                            <li>
                              <a
                                href="https://github.com/allenai/allennlp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                AllenNLP
                              </a>{" "}
                              for advanced NLP tasks.
                            </li>
                            <li>Hosting on OVH servers for reliability.</li>
                          </ul>
                        </section>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </BlurFade>
          </main>
        </div>
      </body>
    </html>
  );
}
