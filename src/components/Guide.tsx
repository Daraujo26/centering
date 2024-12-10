import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export interface GuideProps {
  darkMode: boolean;
}

const Guide: React.FC<GuideProps> = ({ darkMode }) => {
  return (
    <section className="p-8 rounded-lg shadow-md max-w-7xl mx-auto mb-10">
      <div className="flex flex-row items-center mb-4 pl-4">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <h1 className="text-2xl font-semibold text-left pl-2">Guide</h1>
      </div>
      <div
        className={`flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}
      >
        {/* Key Concepts Block */}
        <div
          className={`min-w-[80%] bg-gray-100 snap-center p-6 rounded-2xl shadow-md ${
            darkMode ? " bg-gray-700" : " bg-gray-200"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 text-left">Key Concepts</h2>
          <ul className="list-disc list-inside space-y-4">
            <li>
              <strong>Utterance (U):</strong> A spoken or written statement,
              e.g., "John went to the store."
            </li>
            <li>
              <strong>
                Utterance Sequence (U<sub>n</sub>, U<sub>n+1</sub>):
              </strong>{" "}
              A pair of utterances in a discourse. For example, U<sub>n</sub>:
              "John went to the store." U<sub>n+1</sub>: "He bought some milk."
            </li>
            <li>
              <strong>Discourse Segment (DS):</strong> A coherent segment of
              connected utterances within a conversation or text.
            </li>
            <li>
              <strong>
                Backward-Looking Center (C<sub>b</sub>):
              </strong>{" "}
              The primary entity from U<sub>n</sub> that continues as the focus
              in U<sub>n+1</sub>. Example: In "John went to the store. He bought
              milk," the C<sub>b</sub> is "John."
            </li>
            <li>
              <strong>
                Forward-Looking Centers (C<sub>f</sub>):
              </strong>{" "}
              Potential entities in U<sub>n</sub> that could become the focus in
              U<sub>n+1</sub>. Example: In "John went to the store," C
              <sub>f</sub> might include "John" and "the store."
            </li>
            <li>
              <strong>
                Preferred Center (C<sub>B</sub>):
              </strong>{" "}
              The most likely C<sub>f</sub> to transition to C<sub>b</sub> in U
              <sub>n+1</sub>.
            </li>
          </ul>
        </div>

        {/* Centering Rules Block */}
        <div
          className={`min-w-[80%] snap-center rounded-2xl ${
            darkMode ? " bg-gray-700" : " bg-gray-200"
          } p-6 shadow-md`}
        >
          <h2 className="text-xl font-semibold mb-4 text-left">
            Centering Rules
          </h2>
          <div className="space-y-4">
            <p>
              <strong>Rule 1:</strong> Each utterance has exactly one C
              <sub>b</sub>. This links the discourse back to the previous
              context.
            </p>
            <p>
              <strong>Rule 2:</strong> If there are multiple C<sub>f</sub>s, the
              C<sub>b</sub> in U<sub>n+1</sub> should be the highest-ranked C
              <sub>f</sub> from U<sub>n</sub>.
            </p>
            <p>
              <strong>Rule 3:</strong> Avoid unnecessary shifts of C<sub>b</sub>
              . Coherence is improved when transitions between utterances
              minimize shifts.
            </p>
            <div className="flex justify-center items-center">
              <div
                className={`max-w-[60%] p-4 ${
                  darkMode ? " bg-gray-600" : " bg-gray-300"
                } rounded-xl mt-4 shadow-md`}
              >
                <p className="font-semibold">Preferences for Transitions:</p>
                <ul className="list-disc list-inside">
                  <li>
                    <strong>Continue:</strong> C<sub>b</sub> remains the same,
                    and C<sub>B</sub> is maintained.
                  </li>
                  <li>
                    <strong>Retain:</strong> C<sub>b</sub> remains the same, but
                    C<sub>B</sub> differs.
                  </li>
                  <li>
                    <strong>Shift:</strong> C<sub>b</sub> changes, marking a
                    transition to a different focus.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Transitions Block */}
        <div
          className={`min-w-[80%] snap-center ${
            darkMode ? " bg-gray-700" : " bg-gray-200"
          } p-6 rounded-2xl shadow-md`}
        >
          <h2 className="text-xl font-semibold mb-4 text-left">
            Understanding Transitions
          </h2>
          <p>
            Transitions measure how well the discourse maintains coherence. The
            most coherent discourse occurs with <strong>Continue</strong>{" "}
            transitions, while <strong>Shift</strong> transitions are less
            preferred.
          </p>
          <div className="flex justify-center items-center pt-4">
            <div
              className={`max-w-[60%] p-4 ${
                darkMode ? " bg-gray-600" : " bg-gray-300"
              } rounded-xl mt-4 shadow-md`}
            >
              <p className="font-semibold mb-2">Examples:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Continue:</strong> "John went to the store. He bought
                  milk."
                </li>
                <li>
                  <strong>Retain:</strong> "John went to the store. The store
                  was closed."
                </li>
                <li>
                  <strong>Shift:</strong> "John went to the store. Mary stayed
                  home."
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guide;
