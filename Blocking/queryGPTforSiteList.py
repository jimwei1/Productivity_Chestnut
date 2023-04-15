import openai
import constants.constants as c
import json





def createGPTMessage(message):
    return {"role": "user", "content": message}


def makeGPTRequest(messages):
    return openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )


def createBlockList(categories, recursions=0):
    queryString = f"Please generate a comma-separated list of URLs of the most popular websites in the following categories: {categories}"
    messages = createGPTMessage(queryString)
    response = makeGPTRequest(messages=messages)
    if response['choices'][0]['finish_reason'] != 'stop':
        if recursions < c.openaiQueryLimit:
            createBlockList(categories=categories, recursions=recursions+1)
    data = response['choices'][0]['message']['content'].split()
    with open('blockList.json', 'w') as f:
        json.dump(data, f)





