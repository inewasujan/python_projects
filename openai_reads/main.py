from flask import Flask, render_template, request, jsonify
import openai


app = Flask(__name__)

# Set up OpenAI API credentials
openai.api_key = "YOUR_API_KEY"

# Define the default route to return the index.html file
@app.route("/")
def index():
    return render_template("index.html")

# Define the /api route to handle POST requests
@app.route("/ask", methods=["POST"])
def ask():    
    # Get the message from the POST request
    user_input = request.form['user_input']
        
    # Send the message to OpenAI's API and receive the response
    try:
        completion = openai_client.complete(
            model="davinci",
            prompt=f"User: {user_input}\n",
            max_tokens=150
        )
        chatbot_response = completion.choices[0].text.strip()
        return jsonify({"response": chatbot_response}) 
            
    except Exception as e:
        print({"An error occurred while generating response: ", str(e)})
        return 'Failed to Generate response!'
        

if __name__=='__main__':
    app.run(debug=True)
