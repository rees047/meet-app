Feature: Specify Number of Events

Scenario: On initial page load, 32 is set as the default number of events
Given on initial page load
When the user opens the app
Then the number of events is 32 by default

Scenario: When user changes the input, the number of events shown is updated according to user input
Given user sees the number of events textbox
When the user changes the number of events
Then the number of events changes according to user input

Scenario: If user input is greater than 32, less than 1 or is not a number, the default 32 events is listed as the number of events
Given user sees the number of events textbox
When the user inputs greater than 32, less than 1 or is not a number
Then error message is displayed