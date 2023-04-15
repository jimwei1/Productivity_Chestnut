import {constants} from "../constants"


function createGPTMessage(message) {
    return { role: "user", content: message };
}


function makeGPTRequest(messages) {
    return openai.ChatCompletion.create({
        model: "gpt-3.5-turbo",
        messages: messages
    });
}

function queryGPT(queryString){
    let messages = createGPTMessage(queryString);
    let response = makeGPTRequest({ messages: messages });
    if (response.choices[0].finish_reason !== 'stop') {
        if (recursions < constants.openaiQueryLimit) {
            createBlockList({ categories: categories, recursions: recursions + 1 });
        }
    }
    return response.choices[0].message.content;
}
