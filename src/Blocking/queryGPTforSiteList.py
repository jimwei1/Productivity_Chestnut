import openai
import constants.constants as c
import json





def createGPTMessage(message: str) -> dict[str, str]:
    """
    Creates GPT Message.
    """
    return {"role": "user", "content": message}


def makeGPTRequest(messages: list[str]):
    """
    Creates a GPT request.
    """
    return openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )


def createBlockList(categories: str, recursions: int=0) ->:
    """
    Queries GPT 3.5 Turbo to get a CSV of URLs of a given category.

    Inputs:
    categories:  A string that completes the query string: "Please generate a comma-separated list of URLs of the most popular websites in the following categories: {categories}"
    recursions:  A limit on how many times GPT can be queried if it fails.

    Outputs:
    No explicit output, it dumps the URL blocklist into blockList.json as a list of URL strings.
    """
    queryString = "Please generate a comma-separated list of URLs of the most popular websites in the following categories: {categories}"
    messages = createGPTMessage(queryString)
    response = makeGPTRequest(messages=messages)
    if response['choices'][0]['finish_reason'] != 'stop':
        if recursions < c.openaiQueryLimit:
            createBlockList(categories=categories, recursions=recursions+1)
    data = response['choices'][0]['message']['content'].split()
    with open('blockList.json', 'w') as f:
        json.dump(data, f)





