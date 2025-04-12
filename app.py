from flask import Flask, send_file, jsonify, url_for, request
import os
import io
import random # For unique filenames
import string # For unique filenames
from PIL import Image, ImageDraw
import summarize as s
from flask_cors import CORS
import base64

summary,image_object,name,ticker=s.main_summarizer()


app = Flask(__name__)
# --- Initialize CORS ---
# This enables CORS for all domains on all routes.
# For production, you might want more specific origins: CORS(app, resources={r"/generate-image-data": {"origins": "http://your-frontend-domain.com"}})
CORS(app)

@app.route('/generate-image-and-data') # Changed route name for clarity
def generate_image_and_data_endpoint():
    try:
        # --- Prepare your dictionary ---
        # summary,image_object,name,ticker=s.main_summarizer()
        my_dictionary = {
            "Name": name,
            "ticker": ticker,
            "image": image_object,
            "summary": summary,            
            "status": "success"
        }

        # --- Generate the image object ---
        # Assuming plot_5_day_trend returns a PIL Image object or similar
        # image_object = plot_5_day_trend(company_ticker=my_dictionary["ticker"]) # Pass necessary data

        # if image_object is None:
        #      raise ValueError("Image generation function returned None")

        # # --- Save image to buffer and encode as Base64 ---
        # buf = io.BytesIO()
        # image_object.save(buf, format='PNG')
        # # No plt.close() needed if image_object is PIL Image,
        # # but if plot_5_day_trend uses plt directly, ensure plt.close() is called inside it.
        # buf.seek(0)
        # image_bytes = buf.getvalue()
        # base64_image_string = base64.b64encode(image_bytes).decode('utf-8')

        # --- Combine dictionary and image string in JSON response ---
        response_data = {
            "success": True,
            "dictionaryData": my_dictionary,
            "imageData": base64_image_string # Include Base64 string here
        }
        
        return jsonify(response_data)

    except Exception as e:
        print(f"Error generating image and data: {e}")
        # It's good practice to return JSON even for errors
        return jsonify({"success": False, "error": f"Internal server error: {e}"}), 500


if __name__ == '__main__':
    
    app.run(debug=True, host='0.0.0.0', port=5000)