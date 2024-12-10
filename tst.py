from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://davidaraujo.me", "http://localhost:3000"]}})

nlp = spacy.load("en_core_web_sm")

@app.route("/parse", methods=["POST"])
def parse_text():
    try:
        # Log request data
        app.logger.info("Processing request...")

        data = request.json
        if not data or "text" not in data:
            return jsonify({"error": "No text provided"}), 400

        text = data["text"]
        if not text.strip():
            return jsonify({"error": "Empty text provided"}), 400

        doc = nlp(text)
        results = []
        antecedents = {}

        # Convert sentences to a list for indexing
        sentences = list(doc.sents)

        for sent_index, sent in enumerate(sentences):
            sentence_data = {
                "text": sent.text,
                "tokens": [
                    {"text": token.text, "pos": token.pos_, "dep": token.dep_}
                    for token in sent
                ],
                "entities": [{"text": ent.text, "label": ent.label_} for ent in sent.ents],
            }

            antecedents = {}  # Reset for each sentence

            # Backward-looking centers (C_b)
            for token in sent:
                if token.pos_ == "PRON":
                    antecedent = None
                    if token.dep_ in {"poss", "nsubj"}:
                        antecedent = [
                            t.text for t in sent if t.dep_ in {"nsubj", "PROPN", "dobj"} and t.i < token.i
                        ]
                    if not antecedent:
                        for prev_sent_index in range(sent_index - 1, -1, -1):
                            antecedent = [
                                t.text for t in sentences[prev_sent_index]
                                if t.pos_ in {"PROPN", "NOUN"} or t.dep_ == "ROOT"
                            ]
                            if antecedent:
                                break
                    antecedents[token.text] = antecedent[0] if antecedent else "Unknown"

            sentence_data["c_b"] = [
                {"pronoun": pronoun, "antecedent": antecedents.get(pronoun, "Unknown")}
                for pronoun in antecedents
            ]

            # Forward-looking centers (C_f)
            forward_looking_centers = [
                {"text": token.text, "type": token.ent_type_ or token.pos_}
                for token in sent if token.pos_ in {"NOUN", "PROPN"} or token.ent_type_
            ]
            sentence_data["c_f"] = forward_looking_centers

            app.logger.info(f"Processed sentence {sent_index + 1}: {sent.text}")
            app.logger.info(f"C_b: {sentence_data['c_b']}")
            app.logger.info(f"C_f: {sentence_data['c_f']}")

            results.append(sentence_data)

        return jsonify(results)
    except Exception as e:
        app.logger.error(f"Internal Server Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
