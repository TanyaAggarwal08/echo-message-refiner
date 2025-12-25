# importing required libraries 
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
from tone_suggester import suggested_sentences 

# creating a Flask app
app = Flask(__name__)

# This allows extension to talk to the server without being blocked
# by CORS policy in the browser
CORS(app, resources={r"/*": {"origins": "*"}}) 

# default route
@app.route("/run", methods=["POST"])
def run():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"result": "No data received"}), 400
        
        # Extract text and tone from the received JSON data
        text = data.get("text", "")
        tone = data.get("tone", "")
        
        print(f"Received request: Tone={tone}, Text={text}") # Debugging
        
        result = suggested_sentences(text, tone)
        return jsonify({"result": result})
        
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"result": f"Server Error: {str(e)}"}), 500

if __name__ == "__main__":
    # Used 127.0.0.1 
    app.run(host="127.0.0.1", port=5000, debug=True)