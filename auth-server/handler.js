//'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

/*
* SCOPES allows you to set access levels; this is set to readonly for now because you don't have access right to update the calendar itself

* For more info, chec out the SCOPES documentation at this link: https://developers.google.com/identity/protocols/auth2/scopes
*/

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 * CREDENTIALS are those values required to get access to your calendar. If you see "process.env" this means the value is in the "config.json" file. This is a best practice as it keeps your API secrets hidden. Please remember to add "config.json" to your ".gitignore" file
 */

const CREDENTIALS = {
  CLIENT_ID     : process.env.CLIENT_ID,
  CLIENT_SECRET : process.env.CLIENT_SECRET,
  PROJECT_ID    : process.env.PROJECT_ID,
  CALENDAR_ID   : process.env.CALENDAR_ID,
  AUTH_URI      : "https://accounts.google.com/o/oauth2/auth",
  TOKEN_URI     : "https://oauth2.googleapis.com/token",
  AUTH_PROVIDER_X509_CERT_URL : "https://www.googleapis.com/oauth2/v1/certs",
  REDIRECT_URIS : ["https://rees047.github.io/meet-app"],
  JAVASCRIPT_ORIGINS  : ["https://rees047.github.io", "http://localhost:3000"]
};

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS, CALENDAR_ID } = CREDENTIALS;

const oAUTH2CLIENT = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS[0]);

/**
 * The first step in the OAuth proccess is to generate a URL so users can log in with Google and be authorized to see your calendar. After logging in, they'll receive a code as a URL parameter.
 */

module.exports.getAuthURL = async() => {
  /**
   * Scopes array passed to the `scope` option. Any scopes passed must be enabled in the "OAuth consent screen" settings in your project on your Google Console. 
   * 
   * Also, any passed scopes are the ones users will see when the consent screen is displayed to them
   */
  const authURL = oAUTH2CLIENT.generateAuthUrl({
    access_type : "offline",
    scope: SCOPES
  });

  return {
    statusCode: 200,
    headers : {
      "Access-Control-Allow-Origin" : "*",
    },
    body: JSON.stringify({
      authURL : authURL,
    })
  };

};

/**
 * getAccess Token
 */

module.exports.getAccessToken = async(event) => {
  // the values used to instantiate the OAuthClient are at the top of the file

  const oAUTH2CLIENT = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS[0]);

  // decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     * Exchange authorization code for access token with a "callback" after the exchange.
     * 
     * The callback in this case is an arrow function with the results as parameters: "err" and "token"
     */

  oAUTH2CLIENT.getToken(code, (err, token) =>{
      if(err){
        return reject(err);
      }
      return resolve(token);
    });
  })
  .then((token) => {
    // respond with OAuth token
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
      },
      body: JSON.stringify(token)
    };
  })
  .catch((err) => {
    //handle error
    console.error(err);
    return {
      statusCode : 500,
      body: JSON.stringify(err)
    };
  });

}

/**
 * getCalendarEvents
 */

module.exports.getCalendarEvents = async(event) => {
  // the values used to instantiate the OAuthClient are at the top of the file

  const oAUTH2CLIENT = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS[0]);

  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  oAUTH2CLIENT.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list({
      calendarId: CALENDAR_ID,
      auth: oAUTH2CLIENT,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    }, (err, response) => {
      if(err){
        return reject(err);
      }
      return resolve(response);
    });
  })
  .then((results) => {
    // respond with OAuth token
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
      },
      body: JSON.stringify({events: results.data.items})
    };
  })
  .catch((err) => {
    //handle error
    //console.error(err);
    return {
      statusCode : 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(err)
    };
  });

}