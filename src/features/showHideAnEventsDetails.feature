Feature: Show and hide an events details

Scenario: On initial page load, the event details are hidden by default
Given on initial page load
When the user opens the app
Then the event details are hidden by default

Scenario: When the user clicks on MORE DETAILS, the event details are displayed
Given user sees the MORE details button
When the user clicks on MORE details
Then the event details are displayed

Scenario: When the user clicks on HIDE DETAILS, the event details are hidden
Given user sees the HIDE details button
When the user clicks on HIDE details
Then the event details are hidden