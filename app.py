from flask import Flask, request, jsonify, render_template
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

# Load the pre-trained model
model = tf.keras.models.load_model('skin_disease_model.h5')

# Disease classes
CLASSES = ['Eczema', 'Melanoma', 'Psoriasis']

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    image = image.resize((224, 224))  # Adjust size according to your model
    image = np.array(image) / 255.0
    return np.expand_dims(image, axis=0)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image_file = request.files['image']
    image_bytes = image_file.read()
    
    processed_image = preprocess_image(image_bytes)
    prediction = model.predict(processed_image)
    predicted_class = CLASSES[np.argmax(prediction[0])]
    confidence = float(np.max(prediction[0]))
    
    return jsonify({
        'prediction': f'{predicted_class} (Confidence: {confidence:.2%})'
    })

if __name__ == '__main__':
    app.run(debug=True)
