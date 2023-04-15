import openai


openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        "role": "user", "content": ""
    ]
)