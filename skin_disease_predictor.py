import requests
import base64
from PIL import Image
import json

GEMINI_API_KEY = "AIzaSyDihyQ9fKjAsMbC5E1ZWVgv02461fPJQyk"
API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def analyze_skin_image(image_path):
    try:
        headers = {
            "Content-Type": "application/json"
        }

        image_data = encode_image(image_path)
        
        payload = {
            "contents": [{
                "parts": [{
                    "text": """Analyze this skin image and provide a detailed dermatological assessment. Format the response exactly as follows:

**DIAGNOSED CONDITION:**
* **[PRIMARY DISEASE NAME IN CAPS]**
* Confidence Level: [High/Medium/Low]

**KEY SYMPTOMS OBSERVED:**
* **[SYMPTOM IN CAPS]**: [Description]
* **[SYMPTOM IN CAPS]**: [Description]
(List all visible symptoms)

**ADDITIONAL INFORMATION:**
* Severity Level: [Mild/Moderate/Severe]
* Pattern: [Acute/Chronic]
* Location: [Affected area description]

**RECOMMENDATIONS:**
1. [Treatment suggestions]
2. [Lifestyle modifications]
3. [Prevention measures]

**DISCLAIMER:**
This is an AI-assisted analysis and should not replace professional medical diagnosis."""
                }, {
                    "inline_data": {
                        "mime_type": "image/jpeg",
                        "data": image_data
                    }
                }]
            }]
        }

        response = requests.post(
            f"{API_URL}?key={GEMINI_API_KEY}",
            headers=headers,
            json=payload
        )

        if response.status_code == 200:
            result = response.json()
            return result['candidates'][0]['content']['parts'][0]['text']
        else:
            return f"Error: {response.status_code} - {response.text}"

    except Exception as e:
        return f"Error occurred: {str(e)}"

def format_output(text):
    """Format the output to ensure diseases and symptoms are in bold caps"""
    lines = text.split('\n')
    formatted_lines = []
    for line in lines:
        if ':' in line and ('disease' in line.lower() or 'condition' in line.lower() or 'symptom' in line.lower()):
            part1, part2 = line.split(':', 1)
            formatted_lines.append(f"**{part1.strip().upper()}**:{part2}")
        else:
            formatted_lines.append(line)
    return '\n'.join(formatted_lines)

if __name__ == "__main__":
    print("Predictor")
    print("-" * 50)
    image_path = input("Enter the path to your skin image: ")
    
    result = analyze_skin_image(image_path)
    formatted_result = format_output(result)
    print("\nAnalysis Result:")
    print("-" * 50)
    print(formatted_result)
