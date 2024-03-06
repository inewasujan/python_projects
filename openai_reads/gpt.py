import openai
import os

openai.api_key = "YOUR_API_KEY"

def answer_question(chunk, question):
    prompt = f"""```
{chunk}
```

Based on the above inforamtion, what is the answer to this question?

```
{question}
```"""
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt}
        ]
    )
    return response ["choices"][0]["message"]['content']