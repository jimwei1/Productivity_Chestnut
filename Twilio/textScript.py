from twilio.rest import Client
import time
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..\constants')))
import constants as c


def client_initialization():
    twilio_sid = os.environ.get('twilio_account_sid')
    twilio_auth_token = os.environ.get('twilio_auth_token')
    client = Client(twilio_sid, twilio_auth_token)
    return client


def text(client, msg: str, destination_phone_number: str) -> str:
    message = client.messages.create(
        body=msg,
        from_=c.twilio_source_phone_number,
        to=destination_phone_number
    )

    return message.sid



def call(client, recording_url: str, destination_phone_number: str) -> str:
    message = client.calls.create(
        url=recording_url,
        from_=c.twilio_source_phone_number,
        to=destination_phone_number
    )

    return message.sid


def alarm_triggered(destination_phone_number: str) -> tuple:
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


if __name__=="__main__":
    client = client_initialization()
    sid = text(client, "This is a test", "+1 224 478 5394")
    print(sid)
