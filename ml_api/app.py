from flask import Flask, request, jsonify, send_file
from process_image import process_image
import io

app = Flask(__name__)

@app.route('/process-image', methods=['POST'])
def process_image_endpoint():
    try:
        image_file = request.files['image']
        image_bytes = image_file.read()

        processed_image_bytes = process_image(image_bytes)

        return send_file(io.BytesIO(processed_image_bytes), mimetype='image/png')
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
