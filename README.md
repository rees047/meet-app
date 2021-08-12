# meet-app
 meet-app created using Create React
 
**OBJECTIVE**: The objective of this project is to build a serverless, progressive web application (PWA) with REact using a test-driven development (TDD) technique. This application uses the google Calendar API to fetch upcoming events.

**DESCRIPTION**: This app takes data from the Google Calendar API to fetch cities and upcoming events corresponding to those cities.

By default, all cities are listed and the default number of events is 32. Users can search for cities in the textbox and click on the suggestion list to be able to view the events.

This app was tested using the TDD and BDD approach. The Gherkins file was also very helpful in making sure all requirements are met. Atatus was used to monitor web performance.

Lastly, a line and pie chart was used respectively to show the power of create-react and data visualization.

The web app should work in both desktop and mobile views.

**TECHNOLOGIES**:
"dependencies":
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/user-event": "^12.8.3",
    "atatus-spa": "^4.3.2",
    "axios": "^0.21.1",
    "nprogress": "^0.2.0",
    "react": "^17.0.2",
    "react-bootstrap": "^1.6.1",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "recharts": "^2.1.0",
    "web-vitals": "^0.2.4"

"devDependencies":
    "@testing-library/react": "^11.2.7",
    "@wojtekmaj/enzyme-adapter-react-17": "^0.6.3",
    "enzyme": "^3.11.0",
    "gh-pages": "^3.2.3",
    "jest-cucumber": "^3.0.1",
    "puppeteer": "^10.2.0"

**GH PAGES LINK**:https://rees047.github.io/meet-app

**NOTICE**: It asks for a user authorization content to be able to use the app. No other information is used, collected nor accessed in this app and the calendar that is used is taken from the Google API calendar and not the user's personal calendar.



FEATURE 1: FILTER EVENTS BY CITY
As a user
I should be able to “filter events by city”
So that I can see the list of events that take place in that city

SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed

SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
Given the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city



FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS
As a user
I should be able to toggle (“show/hide” and event’s details)
So that I can see more / minimize information shown for the event’s details

SCENARIO 1: AN EVENT ELEMENT IS COLLAPSED BY DEFAULT
Given the page loads
When the user views the page
Then the event details are collapsed by default

SCENARIO 2: USER CAN EXPAND AN EVENT TO SEE ITS DETAILS
Given the page is already loaded
When the user clicks on the event details
Then the event details are expanded and shown

SCENARIO 3: USER CAN COLLAPSE AN EVENT TO HIDE ITS DETAILS
Given the event page is expanded and shown
When the user clicks on the event details
Then the event details are hidden



FEATURE 3: SPECIFY NUMBER OF EVENTS
As a user
I should be able to input my desired number of events
So that I can see only a number of events as I have required

SCENARIO 1: WHEN USER HASN’T SPECIFIED A NUMBER, 32 IS THE DEFAULT NUMBER
Given the page loads
When the user has not specified a number
Then 32 is the default number

SCENARIO 2: USER CAN CHANGE THE NUMBER OF EVENTS THEY WANT TO SEE
Given the page is already loaded
When the user specifies the number of events
Then the number of events the user wants to see is shown



FEATURE 4: USE THE APP WHEN OFFLINE
As a user
I should be able to use the application offline
So that I can still use the application without internet connection

SCENARIO 1: SHOW CACHED DATA WHEN THERE’S NO INTERNET CONNECTION
Given the app is used without internet connection
When the user opens the app
Then the cached data is shown

SCENARIO 2: SHOW ERROR WHEN USER CHANGES THE SETTINGS (CITY, TIME RANGE)
Given the app is used without internet connection
When the user changes the settings (city, time range)
Then an error message is displayed



FEATURE 5: DATA VISUALIZATION
As a user
I should be able to see a chart of events in each city
So that I can be informed of the number of upcoming events in each city

SCENARIO 1: SHOW A CHART WITH THE NUMBER OF UPCOMING EVENTS IN EACH CITY
Given the page loads
When the user chooses a city
Then a chart with a number of upcoming events in each city is shown
