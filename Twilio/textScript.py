from twilio.rest import Client
import time
import os
import importlib.util
import querying

# Get the absolute path to the constants.py file
constants_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'constants', 'constants.py'))

# Load the constants.py module from the file path
spec = importlib.util.spec_from_file_location('constants', constants_path)
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)


def client_initialization() -> Client:
    """
    Initializes a client for Twilio.
    """
    twilio_sid = os.environ.get(c.twilio_sid_env_name)
    twilio_auth_token = os.environ.get(c.twilio_auth_key_env_name)
    client = Client(twilio_sid, twilio_auth_token)
    return client


def text(client, msg: str, destination_phone_number: str) -> str:
    """
    Sends a text using Twilio.

    Inputs:
    client:  The Twilio client initialized by client_initialization.
    msg:  The message you want to send.
    destination_phone_number:  The phone number you want to send the message to.

    Outputs:
    The SID provided by the client upon sending the message.
    """
    message = client.messages.create(
        body=msg,
        from_=c.twilio_source_phone_number,
        to=destination_phone_number
    )

    return message.sid



def call(client, recording_url: str, destination_phone_number: str) -> str:
    """
    Makes a call using Twilio.

    Inputs:
    client:  The Twilio client initialized by client_initialization.
    recording_url:  The URL where your audio recording can be found.
    destination_phone_number:  The phone number you want to send the message to.

    Outputs:
    The SID provided by the client upon sending the message.
    """
    message = client.calls.create(
        url=recording_url,
        from_=c.twilio_source_phone_number,
        to=destination_phone_number
    )

    return message.sid


def alarm_triggered(destination_phone_number: str) -> tuple:
    """
    The idea here is that you can send a bombardment of calls/texts to serve as an alarm.

    Inputs:
    destination_phone_number: The phone number you're alarming.

    Outputs:
    tuple:  The SIDs of text and call, in that order.
    """
    text_sids = []
    call_sids = []
    client = client_initialization()
    for i in range(c.twilio_call_limit):
        for j in range(c.twilio_text_limit):
            text_sids.append(text(client, c.twilio_text_message, destination_phone_number))
            time.sleep(5/(i+1))
        call_sids.append(call(client, c.twilio_voice_recording_url, c.twilio_source_phone_number))
        time.sleep(10)
    return text_sids, call_sids


def routineTextProcess(client: Client, cursor, listOfNumbers: list[str]) -> list:
    """
    Takes a list of numbers and sends a customized text with the person's name and tasks using SQL queries.
    """
    sid = []
    for tup in listOfNumbers:
        number = tup[0]
        name = querying.query(c.sql_name_query + "'" + number + "'", cursor)
        user_id = querying.query("SELECT id FROM users WHERE phone = '" + number + "'", cursor)
        taskQuery = querying.query("SELECT name FROM tasks WHERE tasks.user_id =" + str(user_id[0][0]), cursor)
        text_message = f"Hello {name}, it\'s time to work. \n You have the following tasks to accomplish: \n {taskQuery} \nWe know you've got this!"
        sid.append(text(client, text_message, number))
    return sid


def motivationalCallProcess(client: Client, listOfNumbers: list[str]) -> list:
    """
    Makes a call to everyone on the list of numbers, but it's not personalized.
    """
    sid = []
    for number in listOfNumbers:
        sid.append(call(client, c.twilio_voice_recording_url, number))
    return sid


if __name__=="__main__":
    client = client_initialization()
    conn, cur = querying.open_database()
    sids = []
    listOfNumbers = querying.query(c.sql_numbers_query, cur)
    current_time = time.gmtime()
    if current_time[3] not in [15, 16, 17]:
        try:
            routineTextProcess(client, cur, listOfNumbers=listOfNumbers)
        except:
            pass
    else:
        try:
            motivationalCallProcess(client, listOfNumbers=listOfNumbers)
        except:
            pass
    sids.append(text(client, "It worked baby!", "+1 224 478 5394"))
    print(sids)
    querying.close_database(conn, cur)
