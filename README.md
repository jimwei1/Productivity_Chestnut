# Productivity_Chestnut

## Summary
Productivity Chestnut is a Chrome extension meant to boost productivity by combining a variety of methods including website blocking, timing, and task organization based on priority, as well as text- and call-based alarm systems.

Ideally, this extension is meant to be used in an educational setting, and would be connected to things like Canvas or Google Classroom to enable teachers or professors to push to-do lists to their students, who could also add personal tasks.

## How to Use

### Front-End


### Texting
If you'd like, you can prompt texts to send by going to GitHub -> Actions -> Demo textScript and then clicking run workflow.

## Video Demonstration
[![Alt text](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

LINK ACTUAL VIDEO!!!!!!


## Design
Our design has a few distict modules, elaborated on below.

## RDS Schema:

![RDS Schema](src/images/RDS Schema.png)

### Backend


### Blocking
This turned out to be extremely simple to implement.  In blocker.js, we created a listener that essentially tracks each HTTP request, identifies whether the request is to a blocked URL, and if it is, triggers an interrupt to redirect you to a better site.  The blocked list is stored in blockList.json, which we planned to update using suggestions from GPT 3.5 Turbo, however, we didn't have time to fully implement that API although we did write a queryGPTforSitList.py file meant to do this upon a user signing up.


### Front End


### Twilio
To implement this, we wrote a few Python files as well as a Yaml file (located in .github).  In querying.py, we created SQL querying functionality, so that we didn't have to utilize multiple lines every query, enabling a bit more readable and beautiful code.  In textScript.py, we implemented the hardcore Twilio functionality, including querying our database to create personalized messaging.  Finally, the Yaml file we created was necessary to pass the API key for Twilio, since we couldn't openly keep it in the GitHub repository and thus had to utilize GitHub secrets, then the environment variable.  This turned out to be a boon however, as it enabled us to set a schedule for when texts should be sent each day to function as a reminder.


## Future Implementation
These are some of the features we started on, but didn't quite finish.
### TaskListing Module
The idea here is that we wanted to create a better interface for the front end to interact with as opposed to just the database.  This way, we could do more complex processing.  In particular, we implemented code to calculate a priority based on the time a task was expected to take and the time left before a deadline, however we didn't manage to test or connect that to the front end.  Further, we wrote some code with plans to query GPT 3.5 Turbo for time to complete estimates based on the tasks' descriptions, but again were unable to complete this in time.