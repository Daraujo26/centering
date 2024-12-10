import Image from "next/image";
import aclLogo from "../app/acl-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Purpose() {
  return (
    <section
      className={`flex flex-col items-center justify-center gap-3 min-h-fit p-4 rounded-lg shadow-md`}
    >
      <div className="mt-1">
        <div className="flex flex-row items-center mb-4 pl-4">
          <FontAwesomeIcon icon={faStar} />
          <h3 className="text-2xl font-semibold text-left pl-2">Purpose</h3>
        </div>
        <p className="mt-2 text-center">
          This demo serves as a bridge between theory and practice, aiming to
          make a foundational concept in linguistics accessible to a wider
          audience.
        </p>
        <div className="flex flex-col justify-center items-center ">
          <ul className="list-disc list-inside text-base mt-4 space-y-2">
            <li>
              Offer an interactive way to explore the principles of Centering
              Theory.
            </li>
            <li>
              Bridge the gap between theoretical linguistics and practical
              applications.
            </li>
            <li>
              Assist students and researchers in better understanding discourse
              coherence.
            </li>
            <li>
              Highlight the historical and ongoing influence of Centering Theory
              in linguistics and AI.
            </li>
            <li>
              Inspire further exploration and application of these concepts in
              modern contexts.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-2 gap-2 m-3">
        <Image priority src={aclLogo} height={120} width={120} alt="ACL Logo" />
        <div className="flex flex-row items-center gap-2">
          <FontAwesomeIcon icon={faAward} />
          <p>ACL 2020 Test-of-Time Award (25 years)</p>
        </div>
      </div>
      <p className="text-base max-w-4xl">
        With well over <strong>3000 citations</strong>, this paper has had a
        profound impact on the study of linguistics, AI, and discourse analysis.
        Its framework has been instrumental in advancing how systems understand
        and process language, bridging gaps between human and machine
        communication. The theories presented have been foundational in
        applications ranging from machine translation and chatbots to text
        summarization, dialogue systems, anaphora resolution, and sentiment
        analysis, underscoring its relevance and influence in both academic and
        practical fields.
      </p>
    </section>
  );
}
