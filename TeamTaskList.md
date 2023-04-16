# Sprint 1: Brainstorming and Task Assignment

# Sprint 2: Component Design & Testing
## Core Components
- Timer (Thomas)
- Site Blocking
    - The actual blocking mechanism (Matt)
    - AI Suggestion (GPT) (Matt)
    - Stat-based model (extra if time allows)
- The To-Do List
    - List ordering (Matt)
    - User input
    - User alteration?
    - Gamification
    - Timebox (GPT for suggestions) (Matt)
- Leaderboard (with RDS integration)

## Extras
- Calendar Integration
- Alarm
    - Requires activity tracking?
    - Sound
    - Text/Call (Twilio?)
- Class Integration (using Canvas for example)

# Sprint 3: Integration & Testing
- Texting
    - Implement SQL Queries
    - Spin up S3 instance with voice recording
    - Link S3 instance with a CloudFront to get a URL for the voice recording
    - Add URL to constants.y to enable calling
- Website
    - Enable pushing of data from front-end to SQL database
    - Spin up Lambda function to host website upon click (which should hopefully be a get or put request?)
    - Use API Gateway to deal with the HTTP request
        - Free .tech domain name available, see Opening Presentation slides (win that backpack)

# Sprint 3: Presentation Preparation
