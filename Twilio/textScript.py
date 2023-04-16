from twilio.rest import Client
from .. import constants as c
import time


def text(msg: str, destination_phone_number: str) -> str:
    client = Client(c.twilio_account_sid, c.twilio_auth_token)

    message = client.messages.create(
        body=msg,
        from_=c.twilio_source_phone_number,
        to=destination_phone_number
    )

    return message.sid



def call(recording_url: str, destination_phone_number: str) -> str:
    client = Client(c.twilio_account_sid, c.twilio_auth_token)

    message = client.calls.create(
        url=recording_url,
        from_=c.twilio_source_phone_number,
        to=destination_phone_number
    )

    return message.sid


def alarm_triggered(destination_phone_number: str) -> tuple:
    text_sids = []
    call_sids = []
    for i in range(c.twilio_call_limit):
        for j in range(c.twilio_text_limit):
            text_sids.append(text(c.twilio_text_message, destination_phone_number))
            time.sleep(5/(i+1))
        call_sids.append(call(c.twilio_voice_recording_url, c.twilio_source_phone_number))
        time.sleep(10)
    return text_sids, call_sids


if __name__=="__main__":
    sid = text("This is a test", "+1 224 478 5394")
    print(sid)
